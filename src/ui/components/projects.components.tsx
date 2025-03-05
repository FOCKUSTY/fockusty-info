import styles from "../../styles/ui/components/projects.module.css";

import React from "react";

import projects from "../../projects";
import ProjectHandler from "../../handlers/project.handler";

const projectHandler = new ProjectHandler();
const names = Object.keys(Object.groupBy(projects, (i) => i.name));

class Component extends React.Component {
  private readonly Project = (name: string, iconUrl: string, addictionStyles: [string[], string[], string[]] = [[], [], []]): React.ReactNode => {
    return (
      <div
        id={`${styles.project}_${name}`}
        className={styles.project + " " + addictionStyles[0].join(" ")}
        onClick={(e) => projectHandler.Handler(e, name)}
      >
        <img src={iconUrl} alt={name} className={addictionStyles[1].join(" ")} />
        <span id={`${styles.project}_${name}_name`} className={addictionStyles[2].join(" ")}>{name}</span>
      </div>
    );
  };

  private readonly Component = (): React.ReactNode => {
    return (
      <div id={styles.projects} className="noselect">
        {
          projects.map((project) =>
            this.Project(project.name, project.icon_url || "/logo.png", [
              [
                names.indexOf(project.name) % 2
                  ? [styles.right, styles.row_reverse].join(" ")
                  : styles.left
              ], [], []
            ]))
        }
      </div>
    );
  };

  public render(): React.ReactNode {
    return this.Component();
  }
}

export default Component;
