import styles from "./dropdown-files.module.css";

import React from "react";

import files from "../../files.json";

class Content<T extends "node" | "react"> {
	private readonly _content: {
		react: React.ReactElement[];
		node: Node[];
	} = { node: [], react: [] };

	private readonly _type: T;

	public constructor(type: T) {
		this._type = type;
	}

	private readonly addContent = (content: string) => {
		const element =
			this._type === "react" ? (
				<button className={styles.content} id={`${styles.content}_${content}`}>
					{content}
				</button>
			) : (
				document.createElement("button")
			);

		if (this._type === "node") {
			const el = element as HTMLButtonElement;

			el.textContent = content;
			el.className = styles.content;
			el.id = `${styles.content}_${content}`;
		}

		if (this._type === "react") this._content.react.push(element as React.ReactElement);
		else this._content.node.push(element as Node);
	};

	private readonly init = () => {
		const isPhone = window.matchMedia("screen and (width < 600px)").matches;

		if (isPhone) this.addContent("stats");

		files.forEach((file) => this.addContent(file));
	};

	public getContent() {
		if (this._content[this._type].length === 0) this.init();

		if (this._type === "react") return this._content.react;
		else return this._content.node;
	}
}

export default Content;
