
export default class Exam {
    constructor(exam) {
        this.name = exam.name;
        this.year = exam.year;
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
