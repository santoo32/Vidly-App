import config from "./../../src/config.json";
import httpService from "./httpService";

export async function login(email, password) {
  return await httpService.post(config.apiUrl + "/auth", { email, password });
}

export async function register(account) {
  return await httpService.post(config.apiUrl + "/users", account);
}
