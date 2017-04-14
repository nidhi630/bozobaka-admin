"use strict";

export default class Question {
    constructor(theory) {
        this.id = theory.id;
        this.sectionId = theory.sectionId;
        this.l1Id = theory.l1Id;
        this.l2Id = theory.l2Id;
        this.l3Id = theory.l3Id;
        this.l4Id = theory.l4Id;
        this.question = theory.question;
        this.status = theory.status;
        this.type = theory.type;
    }

    static parseQuestions(questions = []) {
        let parsedQuestions = [];
        questions.forEach(question => {
            parsedQuestions.push(new Question(question));
        });
        return parsedQuestions;
    }
}
