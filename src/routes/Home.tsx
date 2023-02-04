import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
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
const Banner = styled.div<{ $bgPhoto: string }>`
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
		url(${(props) => props.$bgPhoto});
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
	gap: 5px;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
	height: 200px;
	background-image: url(${(props) => props.$bgPhoto});
	background-position: center center;
	background-color: white;
	font-size: 50px;
	&:first-child {
		transform-origin: center left;
	}
	&:last-child {
		transform-origin: center right;
	}
`;

const Info = styled(motion.div)`
	position: absolute;
	width: 100%;
	bottom: 0;
	padding: 10px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	h4 {
		text-align: center;
		font-size: 18px;
	}
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 40vw;
	height: 80vh;
	background-color: ThreeDDarkShadow;
`;

const rowVariants = {
	hidden: {
		x: window.outerWidth + 5,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 5,
	},
};

const boxVariants = {
	normal: { scale: 1 },
	hover: {
		y: -80,
		scale: 1.3,
		transition: {
			delay: 0.4,
			duration: 0.3,
			type: "tween",
		},
	},
};

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.1,
			type: "tween",
		},
	},
};

const offset = 6;

function Home() {
	/**
	 *	🔻 Box컴포넌트를 클릭하면 새로운 레이아웃의 컴포넌트를 보여주기
	 *  1. onBoxClicked : 파라미터로 movieId를 갖는 클릭이벤트 함수를 Box에 적용한다
	 *  2. useHistory   : push기능으로 클릭한 컴포넌트에 movieId를 추가한 경로를 만들어준다
	 *  3. useRouteMatch   : 설정한 경로의 데이터 정보를(객체타입) 갖는다
	 *  4. AnimatePresence : 애니메이션 컴포넌트 만들기
	 *  5. layoutId        : Box & AnimatePresence 컴포넌트 연결하기
	 *
	 *  🔻 Behind the scene - Overlay & BigMovie 컴포넌트
	 *  1. fragment : Overlay컴포넌트 생성한다
	 *  2. onOverlayClick : 클릭하면 push로 경로를 변경하여 컴포넌트를 비활성화 시킨다
	 */
	const history = useHistory();
	const { scrollY } = useScroll();
	const bigMovieMatch = useRouteMatch<{ movieId: string }>(
		"/movies/:movieId"
	);
	const onBoxClick = (movieId: number) => {
		history.push(`/movies/${movieId}`);
	};
	const onOverlayClick = () => {
		history.push("/");
	};
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
	 *
	 * 🔻 onExitComplete : exit가 종료되면 실행되는 기능
	 * 애니메이션이 실행 도중 또 실행되는 경우 모션이 중첩되어 발생하는 버그 방지
	 * - [false]: 실행 || [true]: 실행제한
	 * - [순서 : false → true → false]
	 * 1. false 기본값으로 하는 boolean props를 만든다
	 * 2. 애니메이션을 작동하는 함수가 실행되면 true로 변경
	 * 3. true → false로 변경하는 함수를 onExitComplete에 연결
	 *
	 * 🔻 AnimatePresence Props [true | false]
	 *  -  initial로 설정된 모션효과를 첫 렌더링때 실행되지 않도록 동작을 차단하기
	 *
	 * 🔻 슬라이더에 데이터 넣기
	 *  - offset : 1 Slider당 보여줄 movie의 갯수
	 *  - index  : 스크롤 이동 버튼을 클릭할 떄마다 1씩 증가
	 *  - overflow-x : x스크롤바 활성 여부
	 *
	 *  1. Box Component
	 *  slice 1 → 배너 moive 제외한다
	 *  slice 2 → 슬라이드 실행 후 다음 데이터의 순서를 만든다(offset * index + offset)
	 *  map     → 컴포넌트로 데이터를 전달한다
	 *  bgPhoto → 컴포넌트의 속성으로 이미지를 저장 & 타입스크립트 정의는 styled-components에서 한다
	 *
	 *  2. 마지막 슬라이드 이후 첫 슬라이드로 이동
	 *  - totleMoives : 데이터의 총 갯수
	 *  - maxIndex    : 데이터의 총 갯수를 6으로 나누고 내림(정수)
	 *
	 *  # custom props Error($ 를 props의 내부값 앞에 표기해준다)
	 *  - 대문자 혹은 어떠한 이유로 SC의 props가 DOM으로 전달되지 않아 발생하는 에러
	 */
	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovies = data.results.length - 1;
			const maxIndex = Math.floor(totalMovies / offset) - 1;
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Banner
						onClick={increaseIndex}
						$bgPhoto={makeImagePath(
							data?.results[0].backdrop_path || ""
						)}
					>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}
						>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(
										offset * index,
										offset * index + offset
									)
									.map((movie) => (
										<Box
											onClick={() => onBoxClick(movie.id)}
											layoutId={movie.id + ""}
											variants={boxVariants}
											initial="normal"
											whileHover="hover"
											key={movie.id}
											$bgPhoto={makeImagePath(
												movie.backdrop_path,
												"w500"
											)}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{bigMovieMatch ? (
							<div>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigMovieMatch.params.movieId}
								>
									{bigMovieMatch.params.movieId}
								</BigMovie>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
							</div>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
