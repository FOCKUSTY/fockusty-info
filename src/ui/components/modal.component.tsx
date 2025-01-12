import React from "react";

import styles from "../../styles/ui/components/modal.module.css";

type Props = {
    id: string;
    children: React.ReactElement;
};

class Component extends React.Component<Props> {
    public readonly state: Readonly<{
        styles: Readonly<{
            display: "none"|"flex",
            opacity: number
        }>
    }>;

    public constructor(props: Props) {
        super(props);

        this.state = {
            styles: {
                display: "flex",
                opacity: 1
            }
        };
    }

    private onBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
        const target = e.currentTarget;

        if (target.id === id + "_bg") {
            target.style.opacity = "0";
            
            setTimeout(() => {
                target.style.display = "none";
            }, 1000);
        }
    }

    public render(): React.ReactNode {
        return (
            <div
                key={this.props.id}
                id={`${this.props.id}_bg`}
                className={styles.modal}
                style={this.state.styles}
                onClick={(e) => this.onBackgroundClick(e, this.props.id)}
            >
                <div
                    id={`${this.props.id}_child`}
                    className={`${styles.content}`}    
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Component;
