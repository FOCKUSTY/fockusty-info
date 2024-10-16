import styles from '../../styles/ui/components/dropdown.module.css';

import React from "react";

type Props = {
    name: string
    content: React.ReactElement[];
    styles?: {[key: string]: string}
};

class Component extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    };

    private Component() {
        const getStyles = (key: string) => {
            const componentStyles = `${styles[key]} ${this.props.styles ? this.props.styles[key] : ''}`;
            
            return componentStyles;
        };

        return (
            <div id={`${styles.dropdown}_${this.props.name}`} className={getStyles('dropdown')}>
                <div>
                    <button id={`${styles.dropbtn}_${this.props.name}`} className={getStyles('dropbtn')}>
                        <span id={this.props.name}>{this.props.name}</span>
                    </button>
                </div>

                <div id={`${styles.dropdown_content}_${this.props.name}`} className={getStyles('dropdown_content')}>
                    {this.props.content.map(el =>
                        el
                    )}
                </div>
            </div>
        );
    };

    public render(): React.ReactNode {
        return this.Component();
    }
};

export default Component;