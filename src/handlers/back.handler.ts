import DropdownStyles from "../styles/ui/components/dropdown.module.css";
import ProjectStyles from "../styles/ui/components/projects.module.css";
import HeaderStyles from "../styles/ui/header.module.css";
import FooterStyles from "../styles/ui/footer.module.css";

import AppStyles from "../pages/app.module.css";

import ProjectHandler from "./project.handler";
import projects from "../projects";

import { service as projectService } from "./project.handler";

const projectHandler = new ProjectHandler();

class BackService {
  private clicked: boolean = false;

  private readonly HideApp = () => {
    const appProjects = document.getElementById(AppStyles.projects) as HTMLElement;

    const h2 = document.querySelector("#" + AppStyles.projects + "_h2") as HTMLElement;

    appProjects.style.transition = "0.3s";
    appProjects.style.opacity = "0";

    setTimeout(() => {
      h2.textContent = "Мои проекты";

      appProjects.style.minWidth = "none";
      appProjects.style.maxWidth = "none";
      appProjects.style.width = "100%";
    }, 300);
  };

  private readonly ShowApp = () => {
    const appProjects = document.getElementById(AppStyles.projects) as HTMLElement;

    appProjects.style.opacity = "1";
  };

  private readonly Project = (name: string, iconUrl: string, indexOfProect: number = 0) => {
    const project = document.createElement("div");
    const img = document.createElement("img");
    const span = document.createElement("span");

    const directionStyle = indexOfProect % 2
      ? [ProjectStyles.right, ProjectStyles.row_reverse].join(" ")
      : ProjectStyles.left;

    project.id = ProjectStyles.project + "_" + name;
    project.className = `${ProjectStyles.project} ${directionStyle}`;

    img.src = iconUrl;
    img.alt = name;

    span.id = ProjectStyles.project + "_" + name + "_name";
    span.textContent = name;

    project.appendChild(img);
    project.appendChild(span);

    project.addEventListener("click", () =>
      projectHandler.Handler({ currentTarget: project }, name)
    );

    return project;
  };

  private readonly AppendProjects = () => {
    const myProjects = document.getElementById(ProjectStyles.projects) as HTMLElement;

    this.HideApp();

    setTimeout(() => {
      for (const index in projects) {
        const data = projects[index];
        const project = this.Project(data.name, data.icon_url || "/logo.png", Number(index));

        myProjects.appendChild(project);
      }
    }, 300);

    setTimeout(() => {
      this.ShowApp();
    }, 600);
  };

  private readonly ClearStats = () => {
    const stats = document.getElementById(AppStyles.stats) as HTMLElement;
    const children = stats.children;

    for (let i = children.length - 1; i >= 0; i--) {
      const child = children.item(i) as HTMLElement;
      child.remove();
    }
  };

  private readonly ClearDropdown = () => {
    const children = [];

    const dropdownContent = document.getElementById(
      DropdownStyles.dropdown_content + "_files"
    ) as HTMLElement;

    for (let i = 0; i < dropdownContent.children.length; i++) {
      children.push(dropdownContent.children.item(i) as HTMLElement);
    }

    children.forEach((child) => child.remove());
  };

  private readonly ClearButtons = () => {
    const dropdown = document.getElementById(AppStyles.dropdown) as HTMLElement;
    const returnButton = document.getElementById(AppStyles.return) as HTMLElement;

    dropdown.style.opacity = "0";
    returnButton.style.opacity = "0";
    dropdown.style.cursor = "auto";
    returnButton.style.cursor = "auto";

    (dropdown.firstChild as HTMLButtonElement).disabled = true;
  };

  private readonly ClearProjects = () => {
    const projects = document.querySelector("#" + ProjectStyles.projects) as HTMLElement;

    const children: HTMLCollection = projects.children;

    for (let i = 0; i < children.length; i++) {
      const child = children.item(i) as HTMLElement;

      child.style.opacity = "0";
      child.style.height = "0px";
      child.style.width = "0px";

      projects.style.flexWrap = "nowrap";
      projects.style.height = "90%";

      setTimeout(() => {
        projects.removeChild(child);
      }, 700);
    }

    this.AppendProjects();
  };

  private readonly ShowUI = () => {
    const header = document.getElementById(HeaderStyles.header) as HTMLElement;
    const footer = document.getElementById(FooterStyles.footer) as HTMLElement;

    function show(el: HTMLElement) {
      el.style.transition = "2s";
      el.style.height = "150px";
      el.style.padding = "20px 10px";

      const children: HTMLCollection = el.children;
      
      for (let i = 0; i < children.length; i++) {
        setTimeout(() => {
          for (let i = 0; i < children.length; i++) {
            const child = children.item(i) as HTMLElement;

            child.style.transition = "0s";
            child.style.opacity = "0";
            child.style.display = "block";
          }
        }, 200);
      }

      setTimeout(() => {
        for (let i = 0; i < children.length; i++) {
          const child = children.item(i) as HTMLElement;
          child.style.transition = "2s";
          child.style.opacity = "1";
        }
      }, 800);
    }

    for (const el of [header, footer]) {
      setTimeout(() => show(el), 600);
    }
  };

  public readonly ClearProject = () => {
    const description = document.getElementById(ProjectStyles.description) as HTMLElement;
    const stats = document.getElementById(AppStyles.stats) as HTMLElement;

    description.style.width = "0%";
    stats.style.opacity = "0";

    setTimeout(() => {
      stats.style.display = "none";

      if (description.textContent !== "") description.remove();
      else {
        (document.getElementById(AppStyles.main) as HTMLElement).appendChild(stats);
        description.remove();
      }

      this.ClearButtons();
      this.ClearDropdown();
      this.ClearProjects();
      this.ClearStats();
    }, 700);
  };

  public UpdatePage() {
    const main = document.getElementById(AppStyles.main) as HTMLElement;
    const projects = document.getElementById(ProjectStyles.projects) as HTMLElement;

    main.style.height = "100%";
    main.style.maxHeight = "400px";
    main.style.minWidth = "300px";

    projects.style.gap = "10px";

    this.ShowUI();
  }

  public ClearClick() {
    this.clicked = false;
  }

  public Click(): boolean {
    if (this.clicked) return true;

    this.clicked = true;

    projectService.ClearClick();

    return false;
  }
}

const service = new BackService();

class BackHandler {
  public Handler() {
    if (service.Click()) return;

    service.ClearProject();
    service.UpdatePage();
  }
}

export { service };

export default BackHandler;
