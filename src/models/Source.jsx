"use strict";

export default class Source {
    constructor(source) {
        this.id = source.id;
        this.name = source.name;
    }

    static parseSources(sources = []) {
        let parsedSources = [];
        sources.forEach((source) => {
            parsedSources.push(new Source(source));
        });
        return parsedSources;
    }
}