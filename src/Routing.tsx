import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./pages/App";

const Main = () => (
	<BrowserRouter basename="/">
		<Routes>
			<Route path="/" Component={App}></Route>
		</Routes>
	</BrowserRouter>
);

export default Main;
