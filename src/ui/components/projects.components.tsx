import React from "react";

import projects from '../../projects';

import styles from '../../styles/ui/components/projects.module.css';

class Component extends React.Component {
    private readonly Project = (name: string, iconUrl: string, link: string) => {
        return (
            <a href={link} className={styles.project} target="_blank" rel="noreferrer">
                <img src={iconUrl} alt={name} />
                <span>{name}</span>
            </a>
        )
    };

    private readonly Component = () => {
        return (
            <div className={styles.projects}>
                {
                    projects.map(project =>
                        this.Project(
                            project.name,
                            project.icon_url || '/logo.png',
                            project.link || 'https://github.com/FOCKUSTY/' + project.name
                        ))
                }
            </div>
        );
    };

    public render(): React.ReactNode {
        return this.Component();
    };
};

export default Component;