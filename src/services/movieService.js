import config from "./../../src/config.json";
import httpService from "./httpService";
//import * as genresAPI from "./genreService";

export async function getMovies() {
  const { data: movies } = await httpService.get(config.apiUrl + "/movies");
  return movies;
}

export async function saveMovie(movie) {
  console.log("Nueva");
  const { data: newMovie } = await httpService.post(
    config.apiUrl + "/movies",
    movie
  );
  return newMovie;
}

export async function getMovie(id) {
  const { data: movie } = await httpService.get(
    config.apiUrl + "/movies/" + id
  );
  return movie;
}

export async function deleteMovie(id) {
  return await httpService.delete(config.apiUrl + "/movies/" + id);
}

export async function updateMovie(movie) {
  console.log("Actualizacion");
  const body = { ...movie };
  delete body._id;
  const { data: newMovie } = await httpService.put(
    config.apiUrl + "/movies/" + movie._id,
    body
  );
  return newMovie;
}
