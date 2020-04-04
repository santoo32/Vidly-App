import React, { Component } from "react";

class MovieForm extends Component {
  render() {
    return (
      <div>
        <h1>Movie id {this.props.match.params.id}</h1>
        <button className="btn btn-primary" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }

  save = () => {
    this.props.history.push("/movies");
  };
}

export default MovieForm;
