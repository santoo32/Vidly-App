import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import Input from "./common/input";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    querySearch: "",
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...(await getGenres())];

    this.setState({ movies: await getMovies(), genres });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      //Revert changes
      if (ex.response && ex.response.status === 404) {
        alert("Post has already been deleted");
      }
      this.setState({ posts: originalMovies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, querySearch: "" });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      querySearch,
      movies: allMovies
    } = this.state;

    var filtered;

    if (!querySearch) {
      filtered =
        selectedGenre && selectedGenre._id
          ? allMovies.filter(m => m.genre._id === selectedGenre._id)
          : allMovies;
    } else {
      filtered = allMovies.filter(m => m.title.includes(querySearch));
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  //Input search box
  handleChange = ({ currentTarget: input }) => {
    this.setState({ querySearch: input.value, selectedGenre: "" });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, querySearch } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <button
              className="btn btn-primary"
              onClick={() => this.props.history.push("/movies/new")}
            >
              New movie
            </button>
          )}
          <p>Showing {totalCount} movies in the database.</p>
          <Input
            target="searchBox"
            label="Buscar"
            onChange={this.handleChange}
            type="text"
            value={querySearch}
          ></Input>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            user={user}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
