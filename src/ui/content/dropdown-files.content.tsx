import React from "react";

import files from '../../files.json';

class Content {
    private readonly content: React.ReactElement[] = [];

    private readonly addContent = (content: string) => {
        const element = (
            <button>{content}</button>
        );

        this.content.push(element);
    };

    private readonly init = () => {
        const isPhone = window.matchMedia('screen and (width < 600px)').matches;

        if(isPhone)
            this.addContent('stats');
            
        files.forEach(file => this.addContent(file));
    };

    public getContent() {
        if(this.content.length === 0)
            this.init();

        return this.content;
    };
};

export default Content;