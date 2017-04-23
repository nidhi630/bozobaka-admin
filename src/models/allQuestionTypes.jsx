"use strict";

export function getAllQuestionTypes() {
    return [{
        id: "single",
        name: "single",
        displayName: "Single Correct"
    }, {
        id: "multiple",
        name: "multiple",
        displayName: "Multiple Correct"
    }];
}