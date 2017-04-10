"use strict";

export default class QuestionType {
    constructor(questionType) {
        this.name = questionType.name;
    }

    static parseQuestionTypes(questionTypes = []) {
        let parsedQuestionTypes = [];
        questionTypes.forEach((questionType) => {
            parsedQuestionTypes.push(new QuestionType(questionType));
        });
        return parsedQuestionTypes;
    }
}
