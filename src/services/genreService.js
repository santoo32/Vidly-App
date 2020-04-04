import config from "./../../src/config.json";
import httpService from "./httpService";

export async function getGenres() {
  const { data: genres } = await httpService.get(config.apiUrl + "/genres");
  return genres;
}

export async function getGenreById(id) {
  const { data: genre } = await httpService.get(
    config.apiUrl + "/genres/" + id
  );
  return genre;
}
