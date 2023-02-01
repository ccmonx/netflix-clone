export const API_KEY = "a5d7ef12614e13273c72a3743f1776c1";
export const BASE_PATH = "https://api.themoviedb.org/3";

export function getMoives() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
	).then((response) => response.json());
}
