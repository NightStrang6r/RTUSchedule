import API from "./API.js";

class Storage {
    constructor() {
        this.API = new API();
    }

    async getSemesterProgEventList(semesterProgramId, year, month) {
        return (await this.API.getSemesterProgEventList(semesterProgramId, year, month));
    }
}

export default Storage;