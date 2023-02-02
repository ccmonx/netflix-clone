export const API_KEY = "a5d7ef12614e13273c72a3743f1776c1";
export const BASE_PATH = "https://api.themoviedb.org/3";
/**
 * 🔻 Query(getMovies)로 응답(전달)받은 Data의 타입을 정의하기
 *  1. 웹브라우저 주소창에 쿼리를 입력하여 Data를 확인한다
 *  2. 사용할 데이터의 형식에 맞게 타입을 정의한다(객체 내부의 배열,객체 확인)
 *  3. 사용될 컴포넌트의 useQuery에 적용한다
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
