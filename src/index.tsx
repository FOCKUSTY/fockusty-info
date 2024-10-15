import "./styles/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";

import Routing from "./Routing";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<Routing />
	</React.StrictMode>
);

reportWebVitals();
