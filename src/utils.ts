/**
 * 🔻 API Data의 이미지를 Banner에 적용하기
 *  Banner : Data배열의 1번째 항목을 보여주는 컴포넌트
 *  1. utils.ts - 이미지를 받아오는 함수를 만든다
 *     이미지는 본래의 경로가 아닌 규칙대로 만들어진 경로여야 한다(makeImagePath)
 *     [ base_url + file_size + file_path ]
 *  2. custom props를 SC로 전달 & 타입 정의한다(bgPhoto를 SC에서 사용하기위함)
 *  3. 이미지 요청하는 함수가 데이터를 받지 못한 경우를 대비한다(data || "")
 *
 *  theMovie Image DB : https://developers.themoviedb.org/3/getting-started/images
 */
const BASE_URL = "https://image.tmdb.org/t/p";

export function makeImagePath(id: string, format?: string) {
	return `${BASE_URL}/${format ? format : "original"}/${id}`;
}
