import fetch from 'node-fetch';
import URL from'./URL.js';

class API {
    constructor() {
        this.URL = new URL();
    }

    async POSTRequest(url, body = null) {
        try {
            if (body) {
                body = new URLSearchParams(body);
            }

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: body 
            };

            const response = await fetch(url, options);
            const data = await response.json();

            return data;
        } catch (e) {
            global.log(`Error while request: ${e}`, 'r');
            return null;
        }
    }

    async getChousenSemesterById(semesterId) {
        try {
            const url = this.URL.getChousenSemesterByIdURL();

            const body = {
                semesterId: semesterId
            };

            const data = await this.POSTRequest(url, body);
            return data;
        } catch (e) {
            global.log(`Error while getChousenSemesterById: ${e}`, 'r');
            return null;
        }
    }

    async findProgramsBySemesterId(semesterId) {
        try {
            const url = this.URL.findProgramsBySemesterIdURL();

            const body = {
                semesterId: semesterId
            };

            const data = await this.POSTRequest(url, body);
            return data;
        } catch (e) {
            global.log(`Error while findProgramsBySemesterId: ${e}`, 'r');
            return null;
        }
    }

    async findCourseByProgramId(semesterId, programId) {
        try {
            const url = this.URL.findCourseByProgramIdURL();

            const body = {
                semesterId: semesterId,
                programId: programId
            };

            const data = await this.POSTRequest(url, body);
            return data;
        } catch (e) {
            global.log(`Error while findCourseByProgramIdURL: ${e}`, 'r');
            return null;
        }
    }

    async findGroupByCourseId(semesterId, programId, courseId) {
        try {
            const url = this.URL.findGroupByCourseIdURL();

            const body = {
                semesterId: semesterId,
                programId: programId,
                courseId: courseId
            };

            const data = await this.POSTRequest(url, body);
            return data;
        } catch (e) {
            global.log(`Error while findGroupByCourseId: ${e}`, 'r');
            return null;
        }
    }

    async isSemesterProgramPublished(semesterProgramId) {
        try {
            const url = this.URL.isSemesterProgramPublishedURL();

            const body = {
                semesterProgramId: semesterProgramId,
            };

            const data = await this.POSTRequest(url, body);
            return data;
        } catch (e) {
            global.log(`Error while isSemesterProgramPublished: ${e}`, 'r');
            return null;
        }
    }

    async getSemProgSubjects(semesterProgramId) {
        try {
            const url = this.URL.getSemProgSubjectsURL();

            const body = {
                semesterProgramId: semesterProgramId,
            };

            const data = await this.POSTRequest(url, body);
            return data;
        } catch (e) {
            global.log(`Error while getSemProgSubjects: ${e}`, 'r');
            return null;
        }
    }

    async getSemesterProgEventList(semesterProgramId, year, month) {
        try {
            const url = this.URL.getSemesterProgEventListURL();

            const body = {
                semesterProgramId: semesterProgramId,
                year: year,
                month: month
            };

            const data = await this.POSTRequest(url, body);
            return data;
        } catch (e) {
            global.log(`Error while getSemesterProgEventList: ${e}`, 'r');
            return null;
        }
    }
}

export default API;