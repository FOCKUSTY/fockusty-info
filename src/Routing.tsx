import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./pages/App";

const Main = (): React.ReactNode => (
	<BrowserRouter basename="/">
		<Routes>
			<Route path="/" Component={App}></Route>
		</Routes>
	</BrowserRouter>
);

export default Main;
