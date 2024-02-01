import express from 'express';
import Router from './router.js';
import bodyParser from 'body-parser';
import c from 'chalk';

class Server {
    constructor(port) {
        this.server = express();
        this.port = port;
    }
    
    run() {
        const router = new Router();

        this.server.use(bodyParser.urlencoded({ extended: false }));

        this.server.get('/',             (req, res) => router.onIndex(req, res));
        this.server.get('/index.html',   (req, res) => router.onIndex(req, res));
        this.server.post('/getSemesterProgEventList', (req, res) => router.getSemesterProgEventList(req, res));
        this.server.post('/getChousenSemesterById', (req, res) => router.getChousenSemesterById(req, res));
        this.server.post('/findProgramsBySemesterId', (req, res) => router.findProgramsBySemesterId(req, res));

        this.server.use(router.static());
        
        this.server.listen(this.port, this.onListen());
    }

    onListen() {
        global.log(`${c.cyan('RTUSchedule Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

export default Server;