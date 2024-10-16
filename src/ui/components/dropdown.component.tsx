import styles from '../../styles/ui/components/dropdown.module.css';

import React from "react";

type Props = {
    name: string
    content: React.ReactElement[];
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private Component() {
        return (
            <div id={`container_${this.props.name}`}>
                <div>
                    <button id={`${styles.dropbtn}_${this.props.name}`} className={styles.dropbtn}>
                        <span id={this.props.name}>{this.props.name}</span>
                    </button>
                </div>

                <div id={`${styles.dropdown_content}_${this.props.name}`} className={styles.dropdown_content}>
                    {...this.props.content}
                </div>
            </div>
        );
    };

    public render(): React.ReactNode {
        return this.Component();
    }
};

export default Component;