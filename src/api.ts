export const API_KEY = "a5d7ef12614e13273c72a3743f1776c1";
export const BASE_PATH = "https://api.themoviedb.org/3";
/**
 * ๐ป Query(getMovies)๋ก ์๋ต(์ ๋ฌ)๋ฐ์ Data์ ํ์์ ์ ์ํ๊ธฐ
 *  1. ์น๋ธ๋ผ์ฐ์  ์ฃผ์์ฐฝ์ ์ฟผ๋ฆฌ๋ฅผ ์๋ ฅํ์ฌ Data๋ฅผ ํ์ธํ๋ค
 *  2. ์ฌ์ฉํ  ๋ฐ์ดํฐ์ ํ์์ ๋ง๊ฒ ํ์์ ์ ์ํ๋ค(๊ฐ์ฒด ๋ด๋ถ์ ๋ฐฐ์ด,๊ฐ์ฒด ํ์ธ)
 *  3. ์ฌ์ฉ๋  ์ปดํฌ๋ํธ์ useQuery์ ์ ์ฉํ๋ค
 */
export interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		ninimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export function getMoives() {
	return fetch(
		`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
	).then((response) => response.json());
}
