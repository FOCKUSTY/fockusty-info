import styles from "../../styles/ui/components/info.module.css";
import Handler from "../../handlers/info.handler";

import React from "react";

const handler = new Handler();

type Props = {
    projects_modal_id: string
}

class Component extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);
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

    public Projects(props: {modalId: string}): React.ReactNode {
        return (
            <div onClick={() => handler.ShowModal(props.modalId)}>
                Projects
            </div>
        );
    };

    public render(): React.ReactNode {
        return (
            <div id={styles.info}>
                <this.Projects modalId={this.props.projects_modal_id} />
                <this.Biography />
                <this.Links />
            </div>
        );
    }
}

export default Component;
