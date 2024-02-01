class API {

    async POSTRequest(url, body = null) {
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
    
        const res = await fetch(url, options);
        return res;
    }

    async getJsonFromRes(res){
        return (await res.json());
    }

    async getSemesters() {
        const url = `/getSemesters`;

        // const body = {
        // };
        // const res = await this.POSTRequest(url, body);
        const res = await this.POSTRequest(url);
        const json = await this.getJsonFromRes(res);
        return json;
    }

    async getSemesterProgEventList(semesterProgramId, year, month) {
        const url = `/getSemesterProgEventList`;

        const body = {
            semesterProgramId: semesterProgramId,
            year: year,
            month: month
        };
        const res = await this.POSTRequest(url, body);
        const json = await this.getJsonFromRes(res);
        return json;
    }

    async getChousenSemesterById(semesterId){
        const url = `/getChousenSemesterById`;

        const body = {
            semesterId: semesterId,
        };
        const res = await this.POSTRequest(url, body);
        const json = await this.getJsonFromRes(res);
        return json;
    }

    async findProgramsBySemesterId(semesterId){
        const url = `/findProgramsBySemesterId`;

        const body = {
            semesterId: semesterId,
        };
        const res = await this.POSTRequest(url, body);
        const json = await this.getJsonFromRes(res);
        return json;
    }
}

export default API;