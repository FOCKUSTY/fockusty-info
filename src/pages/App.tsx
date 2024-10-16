import styles from "./app.module.css";

import React from "react";

import Layout from "../ui/layout.ui";
import Projects from "../ui/components/projects.components";
import Dropdown from "../ui/components/dropdown.component";

class Page extends Layout {
	private readonly Page = () => {
		return (
			<div className={`page ${styles.page}`}>
				<main id={styles.main}>
					<Dropdown content={[
						<div>Hello!</div>,
						<div>Hello!</div>,
						<div>Hello!</div>
						]} name="test"/>
					<div id={styles.projects}>
						<h2 id={`${styles.projects}_h2`}>Мои проеты</h2>
						<Projects />
					</div>
				</main>
			</div>
		);
	};

	public render(): React.ReactNode {
		return this.Layout(this.Page);
	}
}

export default Page;
