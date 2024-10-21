import styles from "../../styles/ui/components/projects.module.css";

import React from "react";

import projects from "../../projects";
import ProjectHandler from "../../handlers/project.handler";

const projectHandler = new ProjectHandler();

class Component extends React.Component {
	private readonly Project = (name: string, iconUrl: string): React.ReactNode => {
		return (
			<div
				id={`${styles.project}_${name}`}
				className={styles.project}
				onClick={(e) => projectHandler.Handler(e, name)}
			>
				<img src={iconUrl} alt={name} />
				<span id={`${styles.project}_${name}_name`}>{name}</span>
			</div>
		);
	};

	private readonly Component = (): React.ReactNode => {
		return (
			<div id={styles.projects}>
				{projects.map((project) =>
					this.Project(
						project.name,
						project.icon_url || "/logo.png"
					)
				)}
			</div>
		);
	};

	public render(): React.ReactNode {
		return this.Component();
	}
}

export default Component;
