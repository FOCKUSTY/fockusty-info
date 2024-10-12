import React from "react";

import LinksComponent from './links.component';

import styles from '../styles/ui/logo.module.css';

class Component extends React.Component {
    public constructor(props: any) {
        super(props);
    };

    private readonly Component = () => {
        return (
            <>
                <div className={styles.logo}>
                    <div className={styles.logo_main}>
                        <img src="/avatar.png" alt="logo" />

                        <div className={styles.text}>
                            <h1>FOCKUSTY</h1>
                            <LinksComponent className={styles.links} />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    public render(): React.ReactNode {
        return this.Component();
    };
};

export default Component;