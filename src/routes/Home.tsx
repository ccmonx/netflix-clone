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

// ð» Custom Props â SCë¡ ì ë¬ & íì ì ì
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
	opacity: 0;
`;

const BigMovie = styled(motion.div)`
	position: absolute;
	left: 0;
	right: 0;
	margin: 0 auto;
	width: 40vw;
	height: 80vh;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
	width: 100%;
	height: 400px;
	background-position: center center;
	background-size: cover;
`;

const Bigtitle = styled.h3`
	position: relative;
	top: -80px;
	padding: 20px;
	font-size: 46px;
	color: ${(props) => props.theme.white.lighter};
`;

const BigOverview = styled.p`
	position: relative;
	top: -80px;
	padding: 20px;
	color: ${(props) => props.theme.white.lighter};
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
	 *	ð» Boxì»´í¬ëí¸ë¥¼ í´ë¦­íë©´ ìë¡ì´ ë ì´ììì ì»´í¬ëí¸ë¥¼ ë³´ì¬ì£¼ê¸°
	 *  1. onBoxClicked : íë¼ë¯¸í°ë¡ movieIdë¥¼ ê°ë í´ë¦­ì´ë²¤í¸ í¨ìë¥¼ Boxì ì ì©íë¤
	 *  2. useHistory   : pushê¸°ë¥ì¼ë¡ í´ë¦­í ì»´í¬ëí¸ì movieIdë¥¼ ì¶ê°í ê²½ë¡ë¥¼ ë§ë¤ì´ì¤ë¤
	 *  3. useRouteMatch   : ì¤ì í ê²½ë¡ì ë°ì´í° ì ë³´ë¥¼(ê°ì²´íì) ê°ëë¤
	 *  4. AnimatePresence : ì ëë©ì´ì ì»´í¬ëí¸ ë§ë¤ê¸°
	 *  5. layoutId        : Box & AnimatePresence ì»´í¬ëí¸ ì°ê²°íê¸°
	 *
	 *  ð» Behind the scene - Overlay & BigMovie ì»´í¬ëí¸
	 *  1. fragment : Overlayì»´í¬ëí¸ ìì±íë¤
	 *  2. onOverlayClick : í´ë¦­íë©´ pushë¡ ê²½ë¡ë¥¼ ë³ê²½íì¬ ì»´í¬ëí¸ë¥¼ ë¹íì±í ìí¨ë¤
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
	 * ð» react-queryë¥¼ ì¬ì©íì¬ API Data ë¶ë¬ì¤ê¸°
	 *  1. install  : @tanstack/react-query (ê¸°ì¡´ react-queryê³¼ React@18ì ì¶©ë)
	 *  2. Provider : QueryClientìì±, QueryClientProviderì°ê²°íë
	 *  3. ë¹ëê¸°í¨ì  : fetch('Data Address).then(json)
	 *  4. useQuery : 2ê°ì íë¼ë¯¸í° ì¤ ì²«ë²ì§¸ë unique Key, ëë²ì§¸ë ë¹ëê¸°í¨ìë¥¼ ë£ëë¤
	 */
	const { data, isLoading } = useQuery<IGetMoviesResult>(
		["movies", "nowPlaying"],
		getMoives
	);
	const clickedMovie =
		bigMovieMatch?.params.movieId &&
		data?.results.find(
			(movie) => movie.id === +bigMovieMatch.params.movieId
		);
	console.log("match", bigMovieMatch);
	console.log("click", clickedMovie);
	/**
	 * ð» Slider & Animation
	 * 1. Row index í ë¹íë¤ : Row 1 = Box 6
	 * 2. indexë¥¼ ì¦ê°ìí¤ë í´ë¦­ ì´ë²¤í¸ í¨ìë¥¼ ë§ë ë¤
	 * 3. ì ëë©ì´ì í¨ê³¼ë¥¼ ì ì©íë¤
	 * - AnimatePresence   : ì»´í¬ëí¸ê° ë ëë§ëê±°ë destoryë  ë í¨ê³¼ë¥¼ ì£¼ë ê¸°ë¥
	 * - window.outerWidth : íë©´ì í¬ê¸° ì¸¡ì 
	 *
	 * ð» onExitComplete : exitê° ì¢ë£ëë©´ ì¤íëë ê¸°ë¥
	 * ì ëë©ì´ìì´ ì¤í ëì¤ ë ì¤íëë ê²½ì° ëª¨ìì´ ì¤ì²©ëì´ ë°ìíë ë²ê·¸ ë°©ì§
	 * - [false]: ì¤í || [true]: ì¤íì í
	 * - [ìì : false â true â false]
	 * 1. false ê¸°ë³¸ê°ì¼ë¡ íë boolean propsë¥¼ ë§ë ë¤
	 * 2. ì ëë©ì´ìì ìëíë í¨ìê° ì¤íëë©´ trueë¡ ë³ê²½
	 * 3. true â falseë¡ ë³ê²½íë í¨ìë¥¼ onExitCompleteì ì°ê²°
	 *
	 * ð» AnimatePresence Props [true | false]
	 *  -  initialë¡ ì¤ì ë ëª¨ìí¨ê³¼ë¥¼ ì²« ë ëë§ë ì¤íëì§ ìëë¡ ëìì ì°¨ë¨íê¸°
	 *
	 * ð» ì¬ë¼ì´ëì ë°ì´í° ë£ê¸°
	 *  - offset : 1 Sliderë¹ ë³´ì¬ì¤ movieì ê°¯ì
	 *  - index  : ì¤í¬ë¡¤ ì´ë ë²í¼ì í´ë¦­í  ëë§ë¤ 1ì© ì¦ê°
	 *  - overflow-x : xì¤í¬ë¡¤ë° íì± ì¬ë¶
	 *
	 *  1. Box Component
	 *  slice 1 â ë°°ë moive ì ì¸íë¤
	 *  slice 2 â ì¬ë¼ì´ë ì¤í í ë¤ì ë°ì´í°ì ììë¥¼ ë§ë ë¤(offset * index + offset)
	 *  map     â ì»´í¬ëí¸ë¡ ë°ì´í°ë¥¼ ì ë¬íë¤
	 *  bgPhoto â ì»´í¬ëí¸ì ìì±ì¼ë¡ ì´ë¯¸ì§ë¥¼ ì ì¥ & íìì¤í¬ë¦½í¸ ì ìë styled-componentsìì íë¤
	 *
	 *  2. ë§ì§ë§ ì¬ë¼ì´ë ì´í ì²« ì¬ë¼ì´ëë¡ ì´ë
	 *  - totleMoives : ë°ì´í°ì ì´ ê°¯ì
	 *  - maxIndex    : ë°ì´í°ì ì´ ê°¯ìë¥¼ 6ì¼ë¡ ëëê³  ë´ë¦¼(ì ì)
	 *
	 *  # custom props Error($ ë¥¼ propsì ë´ë¶ê° ìì íê¸°í´ì¤ë¤)
	 *  - ëë¬¸ì í¹ì ì´ë í ì´ì ë¡ SCì propsê° DOMì¼ë¡ ì ë¬ëì§ ìì ë°ìíë ìë¬
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
							<>
								<Overlay
									onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								/>
								<BigMovie
									style={{ top: scrollY.get() + 100 }}
									layoutId={bigMovieMatch.params.movieId}
								>
									{clickedMovie && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedMovie.backdrop_path,
														"w500"
													)})`,
												}}
											/>
											<Bigtitle>
												{clickedMovie.title}
											</Bigtitle>
											<BigOverview>
												{clickedMovie.overview}
											</BigOverview>
										</>
									)}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default Home;
