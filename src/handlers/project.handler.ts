import type { MouseEvent } from "react";

import DropdownFilesStyles from "../ui/content/dropdown-files.module.css";
import DropdownStyles from "../styles/ui/components/dropdown.module.css";
import ProjectStyles from "../styles/ui/components/projects.module.css";
import HeaderStyles from "../styles/ui/header.module.css";
import FooterStyles from "../styles/ui/footer.module.css";

import AppStyles from "../pages/app.module.css";
import PhoneHandler from "./phone.handler";

import DropdownContent from "../ui/content/dropdown-files.content";

const filters = [/!.*/g, /[\n\r]+/g];

type Stats = "badge" | "languages/top" | "license" | "stars" | "issues";

class Service {
	private isClicked = false;

	private readonly AddContentClickListener = (
		element: Node,
		type: "stats" | "other",
		text: string | Node
	) => {
		element.addEventListener("click", () => {
			const description = document.getElementById(
				ProjectStyles.description
			) as HTMLElement;

			if (description.textContent === text) return;

			description.style.width = "0%";

			setTimeout(() => {
				description.style.width = "100%";

				description.textContent = "";

				if (type === "stats" && (text as HTMLElement).style.display !== "flex") {
					const stats = text as HTMLElement;
					stats.style.display = "flex";
					stats.style.width = "100%";
					stats.style.alignItems = "center";
				}

				if (type === "stats") description.appendChild(text as Node);
				else description.textContent = text as string;
			}, 1000);
		});
	};

	private readonly AppendDropdownContent = (document: Document, name: string) => {
		(async () => {
			const defaultBranch = (
				await (
					await fetch("https://api.github.com/repos/fockusty/" + name)
				).json()
			).default_branch;
			const url = `https://raw.githubusercontent.com/FOCKUSTY/${name}/refs/heads/${defaultBranch}/`;

			const dropdownContent = document.getElementById(
				DropdownStyles.dropdown_content + "_files"
			) as HTMLElement;
			const content = new DropdownContent<"node">("node").getContent() as Node[];

			const isPhone = window.matchMedia("screen and (width < 600px)").matches;

			if (isPhone) content.push(document.getElementById(AppStyles.stats) as Node);

			for (const element of content) {
				const el = element as Node;
				const fileName = el.textContent;

				try {
					console.log((el as HTMLElement).id === AppStyles.stats);

					if ((el as HTMLElement).id === AppStyles.stats) {
						const btn = document.createElement("button");

						btn.className = DropdownFilesStyles.content;
						btn.id = DropdownFilesStyles.content + "_stats";
						btn.textContent = "stats";

						this.AddContentClickListener(btn, "stats", el);
						dropdownContent.appendChild(btn as Node);

						continue;
					}

					const data = await fetch(url + fileName).catch();
					const text = (await data.text())
						.replaceAll("#", "")
						.replaceAll(filters[0], "")
						.replace(filters[1], "\n");

					if (data.status !== 200) continue;

					this.AddContentClickListener(el, "other", text);

					dropdownContent.appendChild(el as Node);
				} catch {}
			}
		})();
	};

	public readonly Stats = (name: string, type: Stats): string => {
		const protocol = "https://img.shields.io/";
		const end = "/fockusty/" + name;

		if (type === "badge") {
			return protocol + type + `${end}-gray`;
		} else {
			return protocol + "github/" + type + end;
		}
	};

	public UIRemove(element: HTMLElement | HTMLElement[]): void {
		function remove(el: HTMLElement) {
			el.style.transition = "2s";
			el.style.height = "150px";

			setTimeout(() => {
				el.style.height = "0px";
				el.style.margin = "0px";
				el.style.padding = "0px";
			}, 100);

			const children: HTMLCollection = el.children;

			setTimeout(() => {
				for (let i = 0; i < children.length; i++) {
					const child = children.item(i) as HTMLElement;

					child.style.opacity = "0";

					setTimeout(() => {
						child.style.display = "none";
					}, 500);
				}
			}, 200);
		}

		if (Array.isArray(element)) for (const el of element) remove(el);
		else remove(element);
	}

	public ProjectsRemove(element: HTMLElement, projectId: string): void {
		const appProjects = element.ownerDocument.getElementById(
			AppStyles.projects
		) as HTMLElement;
		const projects = element.querySelector(
			"#" + ProjectStyles.projects
		) as HTMLElement;
		const h2 = element.querySelector("#" + AppStyles.projects + "_h2") as HTMLElement;
		const name = element.querySelector("#" + projectId + "_name") as HTMLElement;

		const children: HTMLCollection = projects.children;

		projects.style.gap = "0px";
		projects.style.overflow = "hidden";

		for (let i = 0; i < children.length; i++) {
			const child = children.item(i) as HTMLElement;

			if (child.id === projectId) {
				child.style.filter = "brightness(1)";
				name.style.opacity = "0";

				setTimeout(() => {
					name.style.display = "none";
				}, 300);

				h2.textContent = name.textContent;

				continue;
			}

			child.style.opacity = "0";
			child.style.height = "0px";
			child.style.width = "0px";

			projects.style.justifyContent = "center";

			setTimeout(() => {
				appProjects.style.minWidth = "75px";
				appProjects.style.maxWidth = "150px";
				appProjects.style.width = "100%";

				projects.removeChild(child);
			}, 800);
		}
	}

	public UpdatePage(document: Document, name: string): void {
		const main = document.getElementById(AppStyles.main) as HTMLElement;
		const projects = document.getElementById(AppStyles.projects) as HTMLElement;
		const stats = document.getElementById(AppStyles.stats) as HTMLElement;
		const dropdown = document.getElementById(AppStyles.dropdown) as HTMLElement;

		this.AppendDropdownContent(document, name);

		main.style.width = "80%";
		main.style.height = "100%";

		main.style.maxHeight = "600px";

		const children: HTMLCollection = projects.children;

		for (let i = 0; i < children.length; i++) {
			const child = children.item(i) as HTMLElement;

			child.style.position = "relative";
			child.style.opacity = "0";
			child.style.transition = "0.5s";

			setTimeout(() => {
				child.style.opacity = "1";
			}, 800);
		}

		setTimeout(() => {
			main.style.display = "flex";
			stats.style.display = "flex";
			dropdown.style.opacity = "1";

			setTimeout(async () => {
				const description = document.createElement("div");
				description.id = ProjectStyles.description;

				const text = (
					await (
						await fetch(
							`https://raw.githubusercontent.com/FOCKUSTY/${name}/refs/heads/main/README.md`
						)
					).text()
				)
					.replaceAll("#", "")
					.replaceAll(filters[0], "")
					.replace(filters[1], "\n");

				description.textContent = text;

				const isPhone = window.matchMedia("screen and (width < 600px)").matches;

				if (isPhone) {
					new PhoneHandler().Handler({
						main,
						description,
						stats
					});
				}

				main.appendChild(description);
			}, 100);

			const statsComponents: Stats[] = [
				"badge",
				"languages/top",
				"license",
				"issues",
				"stars"
			];

			for (const component of statsComponents) {
				const img = document.createElement("img");

				img.src = this.Stats(name, component);

				img.style.width = "100px";
				img.style.minHeight = "20px";

				stats.appendChild(img);
			}
		}, 700);
	}

	public Click(): boolean {
		if (this.isClicked) return true;

		this.isClicked = true;

		return false;
	}
}

const service = new Service();

class ProjectHandler {
	public Handler(event: MouseEvent<HTMLElement>, name: string): void {
		const document = event.currentTarget.ownerDocument;

		if (service.Click()) return;

		const project = event.currentTarget;

		const projects = document.getElementById(AppStyles.projects) as HTMLElement;
		const header = document.getElementById(HeaderStyles.header) as HTMLElement;
		const footer = document.getElementById(FooterStyles.footer) as HTMLElement;

		service.UIRemove([header, footer]);
		service.ProjectsRemove(projects, project.id);

		setTimeout(() => {
			service.UpdatePage(document, name);
		}, 300);
	}
}

export default ProjectHandler;
