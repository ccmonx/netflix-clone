import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getMoives, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
	background: black;
`;

const Loader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 20vh;
`;

// 🔻 Custom Props → SC로 전달 & 타입 정의
const Banner = styled.div<{ bgPhoto: string }>`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(
			180deg,
			rgba(255, 255, 255, 0) 70%,
			rgba(0, 0, 0, 1) 100%
		),
		url(${(props) => props.bgPhoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 20px;
`;

const Overview = styled.p`
	width: 50%;
	font-size: 30px;
	text-shadow: 2px 2px 4px rgb(0 0 0 / 45%);
`;

function Home() {
	/**
	 * 🔻 react-query를 사용하여 API Data 불러오기
	 *  1. install  : @tanstack/react-query (기존 react-query과 React@18은 충돌)
	 *  2. Provider : QueryClient생성, QueryClientProvider연결한디
	 *  3. 비동기함수  : fetch('Data Address).then(json)
	 *  4. useQuery : 2개의 파라미터 중 첫번째는 unique Key, 두번째는 비동기함수를 넣는다
	 */
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMoives
	);
	console.log(data, isLoading);
	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<Banner
					bgPhoto={makeImagePath(
						data?.results[0].backdrop_path || ""
					)}
				>
					<Title>{data?.results[0].title}</Title>
					<Overview>{data?.results[0].overview}</Overview>
				</Banner>
			)}
		</Wrapper>
	);
}

export default Home;
