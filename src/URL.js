class URL {
    constructor() {
        this.domain = `https://nodarbibas.rtu.lv`;
    }

    getChousenSemesterByIdURL() {
        return `${this.domain}/getChousenSemesterStartEndDate`;
    }

    findProgramsBySemesterIdURL() {
        return `${this.domain}/findProgramsBySemesterId`;
    }

    findCourseByProgramIdURL() {
        return `${this.domain}/findCourseByProgramId`;
    }

    findGroupByCourseIdURL() {
        return `${this.domain}/findGroupByCourseId`;
    }

    isSemesterProgramPublishedURL() {
        return `${this.domain}/isSemesterProgramPublished`;
    }

    getSemProgSubjectsURL() {
        return `${this.domain}/getSemProgSubjects`;
    }

    getSemesterProgEventListURL() {
        return `${this.domain}/getSemesterProgEventList`;
    }
}

module.exports = URL;