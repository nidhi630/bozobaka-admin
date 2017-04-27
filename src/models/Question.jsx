"use strict";

export default class Question {
    constructor(question) {
        this.id = question.id;

        this.sectionId = question.sectionId;
        if (question.section) {
            this.section = question.section;
        }

        this.l1Id = question.l1Id;
        if (question.l1) {
            this.l1 = question.l1;
        }

        this.l2Id = question.l2Id;
        if (question.l2) {
            this.l2 = question.l2;
        }

        this.l3Id = question.l3Id;
        if (question.l3) {
            this.l3 = question.l3;
        }

        this.l4Id = question.l4Id;
        if (question.l4) {
            this.l4 = question.l4;
        }

        this.question = question.question;
        this.status = question.status;
        this.type = question.type || question.questionType;
        this.options = question.options.map((option) => ({
            raw: option.raw || option
        }));
        this.answer = question.answer;
        this.appearedIn = question.appearedInExams || question.appearedIn;
        this.solution = {
            raw: question.solution.raw || question.solution
        };
        this.hint = {
            raw: question.hint.raw || question.hint
        };
        this.difficulty = question.difficulty;
        this.source = question.source;
        this.created = question.created;
        this.updated = question.updated;
    }

    static parseQuestions(questions = []) {
        let parsedQuestions = [];
        questions.forEach(question => {
            parsedQuestions.push(new Question(question));
        });
        return parsedQuestions;
    }

    static validateQuestion(question) {
        let validatedQuestion = new Question(question);
        validatedQuestion.solution = validatedQuestion.solution.raw;
        validatedQuestion.hint = validatedQuestion.hint.raw;
        validatedQuestion.options = validatedQuestion.options.map((option) => (option.raw));
        if (!validatedQuestion.sectionId || !validatedQuestion.l1Id || !validatedQuestion.l2Id ||
            !validatedQuestion.l3Id || !validatedQuestion.question) {
            throw new Error("Invalid Question Input");
        }
        return validatedQuestion;
    }
}
