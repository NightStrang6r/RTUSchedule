import express from 'express';
import API from './API.js';
import Locale from './locale.js';

class Router {
    constructor() {
        this.API = new API();
        this.locale = new Locale(global.storage.indexesPath, 'uk');
    }

    async onIndex(req, res) {
        let lang = 'en';

        if(req.cookies && req.cookies.lang) {
            lang = req.cookies.lang;
        } else {
            res.cookie('lang', lang);
        }

        let index = await this.locale.getIndex(lang);
        res.setHeader('content-type', 'text/html');
        res.send(index);
    }

    static() {
        return express.static(global.storage.staticPath);
    }

    async getSemesterProgEventList(req, res) {
        try {
            if (!req.body || !req.body.semesterProgramId || !req.body.year || !req.body.month) {
                res.status(400).send('Bad request');
                return;
            }
    
            const eventList = await this.API.getSemesterProgEventList(req.body.semesterProgramId, req.body.year, req.body.month);

            if(!eventList) {
                res.status(500).send('Internal server error');
                return;
            }

            res.status(200).send(eventList);
        } catch (e) {
            global.log(`Error while getSemesterProgEventList: ${e}`, 'r');
            return null;
        }
    }

    async getChousenSemesterById(req, res){
        try {
            if (!req.body || !req.body.semesterId) {
                res.status(400).send('Bad request');
                return;
            }
    
            const semeserInfo = await this.API.getChousenSemesterById(req.body.semesterId);

            if(!semeserInfo) {
                res.status(500).send('Internal server error');
                return;
            }

            res.status(200).send(semeserInfo);
        } catch (e) {
            global.log(`Error while getChousenSemesterById: ${e}`, 'r');
            return null;
        }
    }
    
    async findProgramsBySemesterId(req, res){
        try {
            if (!req.body || !req.body.semesterId) {
                res.status(400).send('Bad request');
                return;
            }
    
            const programsList = await this.API.getChousenSemesterById(req.body.semesterId);

            if(!programsList) {
                res.status(500).send('Internal server error');
                return;
            }

            res.status(200).send(programsList);
        } catch (e) {
            global.log(`Error while getChousenSemesterById: ${e}`, 'r');
            return null;
        }
    }
}

export default Router;