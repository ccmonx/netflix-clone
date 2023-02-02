import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

const Slider = styled.div`
	position: relative;
	top: -100px;
`;

const Row = styled(motion.div)`
	display: grid;
	position: absolute;
	grid-template-columns: repeat(6, 1fr);
	width: 100%;
	padding: 0 60px;
	gap: 10px;
`;

const Box = styled.div`
	height: 200px;
	background-color: white;
	color: ${(props) => props.theme.red};
	font-size: 50px;
`;

const Button = styled.button`
	/* display: flex; */
	/* width: 60px; */
	height: 200px;
	background-color: pink;
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth + 10,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 10,
	},
};

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
	/**
	 * 🔻 Slider & Animation
	 * 1. Row index 할당한다 : Row 1 = Box 6
	 * 2. index를 증가시키는 클릭 이벤트 함수를 만든다
	 * 3. 애니메이션 효과를 적용한다
	 * - AnimatePresence   : 컴포넌트가 렌더링되거나 destory될 때 효과를 주는 기능
	 * - window.outerWidth : 화면의 크기 측정
	 */
	const [index, setIndex] = useState(0);
	const increaseIndex = () => setIndex((prev) => prev + 1);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence>
							<Row
								key={index}
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
							>
								{[1, 2, 3, 4, 5, 6].map((i) => (
									<Box key={i}>{i}</Box>
								))}
							</Row>
						</AnimatePresence>
					</Slider>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
