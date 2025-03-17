import styles from "../../styles/ui/components/info.module.css";
import Handler from "../../handlers/info.handler";

import React from "react";

const handler = new Handler();

type Props = {
    projects_modal_id?: string;
    biography_modal_id?: string;
    liks_modal_id?: string;
}

class Component extends React.Component<Props> {
    private readonly modals: Required<Props>;

    public constructor(props: Props) {
        const data = {
            projects_modal_id: "projects_modal_id",
            biography_modal_id: "biography_modal_id",
            liks_modal_id: "liks_modal_id",
            ...props
        };

        super(data);
        this.modals = data;
    }

    public Links(): React.ReactNode {
        return (
            <div>
                Links
            </div>
        );
    };

    public Biography(): React.ReactNode {
        return (
            <div>
                Biography
            </div>
        );
    };

    public Projects(): React.ReactNode {
        return (
            <div onClick={() => handler.ShowModal(this.modals.projects_modal_id)}>
                Projects
            </div>
        );
    };

    public render(): React.ReactNode {
        return (
            <div id={styles.info}>
                <this.Projects />
                <this.Biography />
                <this.Links />
            </div>
        );
    }
}

export default Component;
