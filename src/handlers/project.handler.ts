import type { MouseEvent } from "react";

import showdown from "showdown";

import DropdownFilesStyles from "../ui/content/dropdown-files.module.css";
import DropdownStyles from "../styles/ui/components/dropdown.module.css";
import ProjectStyles from "../styles/ui/components/projects.module.css";
import HeaderStyles from "../styles/ui/header.module.css";
import FooterStyles from "../styles/ui/footer.module.css";

import AppStyles from "../pages/app.module.css";

import PhoneHandler from "./phone.handler";
import DropdownContent from "../ui/content/dropdown-files.content";

import { service as BackService } from "./back.handler";

const mdConverter = new showdown.Converter();

const statsComponents = ["badge", "languages/top", "license", "issues", "stars"] as const;
type Stats = (typeof statsComponents)[number];

class Service {
  private isClicked = false;

  private readonly AddContentClickListener = (
    element: Node,
    type: "stats" | "other",
    text: string | Node
  ) => {
    element.addEventListener("click", () => {
      const description = document.getElementById(ProjectStyles.description) as HTMLElement;

      if (description.innerHTML === text) return;

      description.style.width = "0%";

      setTimeout(() => {
        description.style.width = "100%";
        description.style.opacity = "1";
        description.textContent = "";

        if (type === "stats" && (text as HTMLElement).style.display !== "flex") {
          const stats = text as HTMLElement;
          stats.style.display = "flex";
          stats.style.width = "100%";
          stats.style.alignItems = "center";
          stats.style.opacity = "1";
        }

        if (type === "stats") description.appendChild(text as Node);
        else {
          if (element.textContent?.endsWith(".md"))
            description.innerHTML = mdConverter.makeHtml(text as string);
          else description.innerHTML = `<pre><code>${text}</code></pre>`;
        }
      }, 1000);
    });
  };

  private readonly AppendDropdownContent = (document: Document, name: string) => {
    (async () => {
      const defaultBranch = (
        await (await fetch("https://api.github.com/repos/fockusty/" + name)).json()
      ).default_branch;
      const url = `https://raw.githubusercontent.com/FOCKUSTY/${name}/refs/heads/${defaultBranch}/`;

      const dropdownContent = document.getElementById(
        DropdownStyles.dropdown_content + "_files"
      ) as HTMLElement;
      const content = new DropdownContent<"node">("node").getContent() as Node[];

      const isPhone = window.matchMedia("screen and (width < 600px)").matches;

      if (isPhone) content.push(document.getElementById(AppStyles.stats) as Node);

      for (const element of content) {
        if (!element) continue;

        const el = element as HTMLElement;
        const fileName = el.textContent;

        try {
          if (el.id === AppStyles.stats) {
            const btn = document.createElement("button");

            btn.className = DropdownFilesStyles.content;
            btn.id = DropdownFilesStyles.content + "_stats";
            btn.textContent = "stats";

            this.AddContentClickListener(btn, "stats", el);
            dropdownContent.appendChild(btn as Node);

            continue;
          }

          const data = await fetch(url + fileName).catch();
          const text = await data.text();

          if (data.status !== 200) continue;

          this.AddContentClickListener(el, "other", text);

          dropdownContent.appendChild(el);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  };

  public readonly Stats = (name: string, type: Stats): string => {
    const protocol = "https://img.shields.io/";
    const end = "/fockusty/" + name;

    if (type === "badge") {
      return protocol + type + `${end.replaceAll(/[-_]/g, "")}-gray`;
    } else {
      return protocol + "github/" + type + end;
    }
  };

  public UIRemove(element: HTMLElement | HTMLElement[]): void {
    function remove(el: HTMLElement) {
      el.style.position = "absolute";

      setTimeout(() => {
        el.style.transition = "1s";

        el.style.height = "0px";
        el.style.margin = "0px";
        el.style.padding = "0px";

        setTimeout(() => {
          el.style.position = "relative";
        }, 1000);
      }, 500);

      const children: HTMLCollection = el.children;

      setTimeout(() => {
        for (let i = 0; i < children.length; i++) {
          const child = children.item(i) as HTMLElement;

          child.style.transition = "0.3s";
          child.style.opacity = "0";

          setTimeout(() => {
            child.style.display = "none";
          }, 300);
        }
      }, 100);
    }

    if (Array.isArray(element)) for (const el of element) remove(el);
    else remove(element);
  }

  public ProjectsRemove(element: HTMLElement, projectId: string): void {
    const appProjects = element.ownerDocument.getElementById(AppStyles.projects) as HTMLElement;
    const projects = element.querySelector("#" + ProjectStyles.projects) as HTMLElement;
    const h2 = element.querySelector("#" + AppStyles.projects + "_h2") as HTMLElement;
    const name = element.querySelector("#" + projectId + "_name") as HTMLElement;

    const children: HTMLCollection = projects.children;

    projects.style.gap = "0px";

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

      projects.style.alignContent = "center";
      projects.style.height = "fit-content";
      projects.style.flexWrap = "wrap";

      setTimeout(() => {
        appProjects.style.width = "100%";

        projects.removeChild(child);
      }, 800);
    }
  }

  public UpdatePage(document: Document, name: string): void {
    const main = document.getElementById(AppStyles.main) as HTMLElement;
    const projects = document.getElementById(AppStyles.projects) as HTMLElement;
    const dropdown = document.getElementById(AppStyles.dropdown) as HTMLButtonElement;
    const returnButton = document.getElementById(AppStyles.return) as HTMLButtonElement;
    const stats = document.getElementById(AppStyles.stats) as HTMLElement;

    this.AppendDropdownContent(document, name);

    const isPhone = window.matchMedia("screen and (width < 600px)").matches;

    main.style.width = "80%";
    main.style.height = "100%";
    main.style.maxHeight = "calc(100% - 100px)";

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
      returnButton.style.opacity = "1";
      dropdown.style.cursor = "pointer";
      returnButton.style.cursor = "pointer";
      dropdown.disabled = false;
      returnButton.disabled = false;

      setTimeout(async () => {
        const defaultBranch = (
          await (await fetch("https://api.github.com/repos/fockusty/" + name)).json()
        ).default_branch;

        const description = document.createElement("div");
        description.id = ProjectStyles.description;
        description.style.display = "block";

        const data = await fetch(
          `https://raw.githubusercontent.com/FOCKUSTY/${name}/refs/heads/${defaultBranch}/README.md`
        );

        const text = await data.text();

        description.innerHTML =
          data.status === 200
            ? mdConverter.makeHtml(text)
            : "Главный README файл был не найден, посмотрите, какие файлы сущесвует с помощью кнопки!";

        if (isPhone) {
          new PhoneHandler().Handler({
            main,
            description,
            stats
          });
        }

        main.appendChild(description);
      }, 100);

      for (const component of statsComponents) {
        const img = document.createElement("img");

        img.src = this.Stats(name, component);
        img.style.width = "100px";
        img.style.minHeight = "20px";

        stats.appendChild(img);
      }
    }, 700);
  }

  public ClearClick() {
    this.isClicked = false;
  }

  public Click(): boolean {
    if (this.isClicked) return true;

    this.isClicked = true;

    BackService.ClearClick();

    return false;
  }
}

const service = new Service();

class ProjectHandler {
  public Handler(event: MouseEvent | { currentTarget: HTMLElement }, name: string): void {
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

export { service };

export default ProjectHandler;
