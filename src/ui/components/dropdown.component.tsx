import styles from "../../styles/ui/components/dropdown.module.css";

import React from "react";

type Props = {
  name: string;
  content: React.ReactNode[];
  styles?: { [key: string]: string };
  className?: string;
  id?: string;
};

class Component extends React.Component<Props> {
  private readonly offset;

  constructor(props: Props) {
    super(props);
    this.offset = "25px";
  }

  public componentDidMount(): void {
    const windowHeight = window.document
      .getElementsByTagName("html")[0]
      .getBoundingClientRect().height;
    const dropdown = window.document.getElementById(
      `${styles.dropdown}_${this.props.name}`
    ) as HTMLElement;
    const content = window.document.getElementById(
      `${styles.dropdown_content}_${this.props.name}`
    ) as HTMLElement;
    const position = dropdown.getBoundingClientRect();

    if (position.top > windowHeight / 2) {
      content.style.bottom = this.offset;
    }
  }

  private Component() {
    const getStyles = (key: string) => {
      const componentStyles = `${styles[key]} ${this.props.styles ? this.props.styles[key] : ""}`;

      return componentStyles;
    };

    return (
      <div id={this.props.id} className={this.props.className}>
        <div id={`${styles.dropdown}_${this.props.name}`} className={getStyles("dropdown")}>
          <div>
            <button id={`${styles.dropbtn}_${this.props.name}`} className={getStyles("dropbtn")}>
              <span id={this.props.name}>{this.props.name}</span>
            </button>
          </div>

          <div
            id={`${styles.dropdown_content}_${this.props.name}`}
            className={getStyles("dropdown_content")}
          >
            {this.props.content.map((el) => el)}
          </div>
        </div>
      </div>
    );
  }

  public render(): React.ReactNode {
    return this.Component();
  }
}

export default Component;
