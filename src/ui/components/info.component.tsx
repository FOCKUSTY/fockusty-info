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

    public Links(data: {id: string}): React.ReactNode {
        return (
            <div key={data.id + "_info"}>
                Links
            </div>
        );
    };

    public Biography(data: {id: string}): React.ReactNode {
        return (
            <div key={data.id + "_info"}>
                Biography
            </div>
        );
    };

    public Projects(data: {id: string}): React.ReactNode {
        return (
            <div
                key={data.id + "_info"}
                onClick={() => handler.ShowModal(data.id)}
            >
                Projects
            </div>
        );
    };

    public render(): React.ReactNode {
        return (
            <div id={styles.info}>
                <this.Projects id={this.modals.projects_modal_id} />
                <this.Biography id={this.modals.biography_modal_id} />
                <this.Links id={this.modals.liks_modal_id} />
            </div>
        );
    }
}

export default Component;
