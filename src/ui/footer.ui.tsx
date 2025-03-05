import React from "react";

import LinksComponent from "./components/links.component";

import styles from "../styles/ui/footer.module.css";

class Component extends React.Component {
  private readonly Component = (): React.ReactNode => {
    return (
      <>
        <footer id={styles.footer}>
          <div>
            <h2>FOCKUSTY</h2>
            <h2>© 2025</h2>
          </div>

          <LinksComponent className={styles.links} text={true} />
        </footer>
      </>
    );
  };

  public render(): React.ReactNode {
    return this.Component();
  }
}

export default Component;
