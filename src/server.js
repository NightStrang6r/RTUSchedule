const express = require('express');
const Router = require('./router.js');
const c = require('chalk');

class Server {
    constructor(port) {
        this.server = express();
        this.port = port;
    }
    
    run() {
        const router = new Router();

        this.server.get('/',             (req, res) => router.onIndex(req, res));
        this.server.get('/index.html',   (req, res) => router.onIndex(req, res));

        this.server.use(router.static());
        
        this.server.listen(this.port, this.onListen());
    }

    onListen() {
        global.log(`${c.cyan('RTUSchedule Server')} ${c.green(`is running on port ${this.port}`)}`);
    }
}

module.exports = Server;