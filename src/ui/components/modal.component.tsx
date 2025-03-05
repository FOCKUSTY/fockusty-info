import React from "react";

import styles from "../../styles/ui/components/modal.module.css";
import Service from "../../handlers/modals.service";

type Props = {
  id: string;
  children: React.ReactElement;
};

class Component extends React.Component<Props> {
  public readonly state: Readonly<{
    styles: Readonly<{
      display: "none" | "block";
      opacity: number;
      zIndex: number
    }>;
  }>;

  public constructor(props: Props) {
    super(props);

    this.state = {
      styles: {
        display: "none",
        opacity: 0,
        zIndex: 20
      }
    };
  }

  private onBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
    const modal = document.getElementById(this.props.id + "_bg") as HTMLElement;
    const target = e.target as HTMLElement;

    if (target.id !== id) return;
    
    new Service().Show(false);

    modal.style.opacity = "0";
    setTimeout(() => { modal.style.display = "none"; }, 1000);
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
          id={this.props.id}
          className={styles.modal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div id={`${this.props.id}_child`} className={`${styles.content}`}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Component;
