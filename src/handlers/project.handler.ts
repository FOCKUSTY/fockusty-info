import type { MouseEvent } from 'react';

import ProjectStyles from '../styles/ui/components/projects.module.css';
import HeaderStyles from '../styles/ui/header.module.css';
import FooterStyles from '../styles/ui/footer.module.css';

import AppStyles from '../pages/app.module.css';

const filters = [
    /!.*/g,
    /[\n\r]+/g
];

type Stats =
	'badge' |
	'languages/top' |
	"license" |
	"stars" |
	"issues";

class Service {
    private isClicked = false;

    public readonly Stats = (name: string, type: Stats) => {
		const protocol = 'https://img.shields.io/';
		const end = '/fockusty/' + name;

		if(type === 'badge') {
			return protocol + 'badge/' + `fockusty-${name}-${name}`;
		} else {
			return protocol + 'github/' + type + end;
		};
	}

    public UIRemove(element: HTMLElement|HTMLElement[]) {
        function remove(el: HTMLElement) {
            el.style.transition = '2s';
            el.style.height = '150px';
    
            setTimeout(() => {
                el.style.height = '0px';
                el.style.margin = '0px';
                el.style.padding = '0px';
            }, 100);
    
            const children: HTMLElement[] = el.children as any;
    
            setTimeout(() => {
                for (const child of children) {
                    child.style.opacity = '0';
    
                    setTimeout(() => {
                        child.style.display = 'none';
                    }, 500);
                }
            }, 200);
        };

        if(Array.isArray(element))
            for(const el of element)
                remove(el);
        else
            remove(element);
    }

    public ProjectsRemove(element: HTMLElement, projectId: string) {
        const appProjects = element.ownerDocument.getElementById(AppStyles.projects) as HTMLElement;
        const projects = element.querySelector('#' + ProjectStyles.projects) as HTMLElement;
        const h2 = element.querySelector('#' + AppStyles.projects + '_h2') as HTMLElement;
        const name = element.querySelector('#' + projectId + '_name') as HTMLElement;

        const children: HTMLElement[] = projects.children as any;

        projects.style.gap = '0px';
        projects.style.overflow = 'hidden';

        for (const child of children) {
            if(child.id === projectId) {
                child.style.filter = 'brightness(1)';
                name.style.opacity = '0';

                setTimeout(() => {
                    name.style.display = 'none';
                }, 300);

                h2.textContent = name.textContent;

                continue;
            };

            child.style.opacity = '0';
            child.style.height = '0px';
            child.style.width = '0px';

            projects.style.justifyContent = 'center';

            setTimeout(() => {
                appProjects.style.minWidth = '75px';
                appProjects.style.maxWidth = '150px';
                appProjects.style.width = '100%';

                projects.removeChild(child);
            }, 800);
        };
    }

    public UpdatePage(document: Document, name: string) {
        const main = document.getElementById(AppStyles.main) as HTMLElement;
        const projects = document.getElementById(AppStyles.projects) as HTMLElement;
        const stats = document.getElementById(AppStyles.stats) as HTMLElement;

        main.style.width = '80%';
        main.style.height = '100%';

        main.style.maxHeight = '600px';

        for (const child of (projects.children as any) as HTMLElement[]) {
            child.style.position = 'relative';
            child.style.opacity = '0';
            child.style.transition = '0.5s';

            setTimeout(() => {
                child.style.opacity = '1';
            }, 800);
        };

        setTimeout(() => {
            main.style.display = 'flex';
            stats.style.display = 'flex';

            setTimeout(async () => {
                const description = document.createElement('div');
                description.className = ProjectStyles.description;

                const text = (await (await fetch(`https://raw.githubusercontent.com/FOCKUSTY/${name}/refs/heads/main/README.md`))
                    .text())
                    .replaceAll('#', '')
                    .replaceAll(filters[0], '')
                    .replace(filters[1], '\n');

                description.textContent = text;

                main.appendChild(description);
            }, 100);

            const statsComponents: Stats[] = [
                'badge',
                'languages/top',
                "license",
                "issues",
                "stars"
            ]

            for(const component of statsComponents) {
                const img = document.createElement('img');

                img.src = this.Stats(name, component);

                img.style.width = '100px';
                img.style.minHeight = '20px';

                stats.appendChild(img);
            };

        }, 700);
    }

    public Click() {
        if(this.isClicked)
            return true;

        this.isClicked = true;

        return false;
    }
};

const service = new Service();

class ProjectHandler {
    public Handler(event: MouseEvent<HTMLElement>, name: string) {
        const document = event.currentTarget.ownerDocument;
        
        if(service.Click()) return;

        const project = event.currentTarget;

        const projects = document.getElementById(AppStyles.projects) as HTMLElement;
        const header = document.getElementById(HeaderStyles.header) as HTMLElement;
        const footer = document.getElementById(FooterStyles.footer) as HTMLElement;

        service.UIRemove([header, footer]);
        service.ProjectsRemove(projects, project.id);

        setTimeout(() => {
            service.UpdatePage(document, name);
        }, 300);
    };
};

export default ProjectHandler;