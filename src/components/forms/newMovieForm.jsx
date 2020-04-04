import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getGenres, getGenreById } from "./../../services/genreService";
import { saveMovie } from "./../../services/movieService";
import { getMovie } from "./../../services/movieService";
import { updateMovie } from "./../../services/movieService";

class NewMovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    genres: [],
    errors: {}
  };

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;

    if (movieId === undefined) return;
    const movie = await getMovie(movieId);
    this.setState({ data: this.mapToState(movie) });
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(1)
      .max(100)
      .label("Number in stock"),
    rate: Joi.number()
      .required()
      .min(1)
      .max(10)
      .label("Rating")
  };

  render() {
    return (
      <div>
        <h1>New movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderDropDown("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

  async doSubmit() {
    const { title, genre, numberInStock, rate } = this.state.data;
    const { id: movieId } = this.props.match.params;
    if (!movieId) {
      const movie = {
        title: title,
        genreId: genre,
        numberInStock: numberInStock,
        dailyRentalRate: rate
      };
      saveMovie(movie);
    } else {
      const movie = {
        _id: movieId,
        title: title,
        genreId: genre,
        numberInStock: numberInStock,
        dailyRentalRate: rate
      };
      await updateMovie(movie);
    }

    this.props.history.push("/movies");
  }

  mapToState = movie => {
    return {
      title: movie.title,
      genre: getGenreById(movie.genre._id).name,
      numberInStock: movie.numberInStock,
      rate: movie.dailyRentalRate
    };
  };
}

export default NewMovieForm;
