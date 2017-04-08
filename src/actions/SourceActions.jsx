"use strict";

import {INIT_SOURCES} from "./ActionConstants";

export function initSources(sources) {
    return {
        type: INIT_SOURCES,
        sources
    }
}

export function fetchSources() {
    return (dispatch) => {
        
    }
}