import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./routes/Home";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/search">
					<Search />
				</Route>
				<Route path="/tv">
					<Tv />
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
