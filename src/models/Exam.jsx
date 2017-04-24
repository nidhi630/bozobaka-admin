
export default class Exam {
    constructor(exam) {
        this.id = exam.id;
        this.name = exam.name;
        this.created = exam.created;
        this.updated = exam.updated;
    }

    static parseExams(exams) {
        let parsedExams = [];
        exams.forEach((exam) => {
            parsedExams.push(new Exam(exam));
        });
        return parsedExams;
    }
}
