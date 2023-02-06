import { useLocation } from "react-router-dom";

function Search() {
	const location = useLocation();
	console.log("location", location);

	const keyword = new URLSearchParams(location.search).get("keyword");
	console.log("keyword", keyword);

	return <div></div>;
}

export default Search;
