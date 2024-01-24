class API {
    async getSemesterProgEventList(semesterProgramId, year, month) {
        const url = `/getSemesterProgEventList`;

        const body = {
            semesterProgramId: semesterProgramId,
            year: year,
            month: month
        };

        const data = new URLSearchParams(body);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: data
        };

        let res, json;
    
        try {
            res = await fetch(url, options);
            json = await res.json();
        } catch (err) {
            json = false;
        }
    
        return json;
    }
}

export default API;