import React from 'react';
import styles from '../styles/app.module.css';

class Page extends React.Component {
    private readonly Page = () => {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    };

    public render(): React.ReactNode {
        return this.Page();
    };
};

export default Page;