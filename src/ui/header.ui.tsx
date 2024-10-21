import React from "react";

import LogoComponent from "./components/logo.component";
import SwitchComponent from "./components/switch.component";

import styles from "../styles/ui/header.module.css";

class Component extends React.Component {
	private readonly Component = (): React.ReactNode => {
		return (
			<>
				<header id={styles.header}>
					<LogoComponent />

					<div className={styles.logo}>
						<SwitchComponent className={styles.switcher} id="switch" />
						<h2>The Void</h2>
					</div>
				</header>
			</>
		);
	};

	public render(): React.ReactNode {
		return this.Component();
	}
}

export default Component;
