import styles from "./app.module.css";

import React from "react";

import BackHandler from "../handlers/back.handler";

import Layout from "../ui/layout.ui";

import Projects from "../ui/components/projects.components";
import Dropdown from "../ui/components/dropdown.component";
import Modal from "../ui/components/modal.component";
import Info from "../ui/components/info.component";

class Page extends Layout {
  private readonly Page = () => {
    return (
      <>
        <div id="all_modals" className={styles.modals}>
          <Modal id="projects_modal">
            <>
              <div id={styles.projects} className="noselect">
                <h2 id={`${styles.projects}_h2`}>Мои проекты</h2>
                <Projects />
                <div id={styles.stats}></div>
              </div>
            </>
          </Modal>
        </div>

        <div className={`page ${styles.page}`}>
          <main id={styles.main}>
            <Info projects_modal_id="projects_modal" />

            <div className={styles.buttons} id={styles.project_buttons}>
              <div id={styles.return}>
                <button onClick={new BackHandler().Handler}>Return</button>
              </div>
              <Dropdown className="noselect" id={styles.dropdown} content={[]} name="files" />
            </div>
          </main>
        </div>
      </>
    );
  };

  public render(): React.ReactNode {
    return this.Layout(this.Page);
  }
}

export default Page;
