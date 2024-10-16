import { ChangeEvent } from "react";

let currentTheme: "dark" | "light";

class SwitchThemeHandler {
	private readonly _vars: {
		[key: string]: { dark: string; light: string };
	} = {
		"--text-color": { dark: "#ffffff", light: "#000000" },
		"--bg-color": { dark: "#000000", light: "#ffffff" },
		"--main-color": { dark: "#161616", light: "#e6e6e6" },

		"--section-color": { dark: "#000000", light: "#ffffff" },
		"--component-color": { dark: "#131313", light: "#e9e9e9" },
		"--shadow-color": { dark: "#1f1f1f", light: "#c4c4c4" }
	};

	public Handler = (event: ChangeEvent<HTMLInputElement>) => {
		const document = event.target.ownerDocument;
		const html = document.querySelector("html");

		if (!html) return;

		const switchTheme = (theme: "dark" | "light") => {
			html.style.cssText = `color-scheme: ${theme}`;

			for (const key in this._vars) {
				const value = this._vars[key];

				document.documentElement.style.setProperty(key, value[theme]);
			}

			html.style.colorScheme = theme;
			currentTheme = theme;
		};

		if (!event.target.checked || html.style.colorScheme === "dark")
			switchTheme("light");
		else switchTheme("dark");
	};

	public OnLoad = (id: string) => {
		const document = window.document;
		const inputElement = document.querySelector(`#${id}`) as HTMLInputElement;

		const isLight = window.matchMedia("(prefers-color-scheme: light)").matches;

		if (isLight) {
			inputElement.checked = false;
			currentTheme = "light";
		} else {
			inputElement.checked = true;
			currentTheme = "dark";
		}
	};

	public static getTheme() {
		return currentTheme;
	}
}

export default SwitchThemeHandler;
