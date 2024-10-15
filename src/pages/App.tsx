import React from "react";

import Layout from "../ui/layout.ui";
import Projects from "../ui/components/projects.components";

import styles from "./app.module.css";

class Page extends Layout {
	private readonly Page = () => {
		return (
			<div className={`page ${styles.page}`}>
				<main id={styles.main}>
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
