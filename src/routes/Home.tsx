import { useQuery } from "@tanstack/react-query";
import { getMoives } from "../api";

function Home() {
	/**
	 * 🔻 react-query를 사용하여 API Data 불러오기
	 *  1. install  : @tanstack/react-query (기존 react-query과 React@18은 충돌)
	 *  2. Provider : QueryClient생성, QueryClientProvider연결한디
	 *  3. 비동기함수  : fetch('Data Address).then(json)
	 *  4. useQuery : 2개의 파라미터 중 첫번째는 unique Key, 두번째는 비동기함수를 넣는다
	 */
	const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMoives);
	console.log(data, isLoading);
	return <div></div>;
}

export default Home;
