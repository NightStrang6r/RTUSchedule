const express = require('express');
const API = require('./API.js');

class Router {
    constructor() {
        this.API = new API();
    }

    async onIndex(req, res) {
        res.setHeader('content-type', 'text/html');
        res.send("<h1>RTUSchedule Server</h1>");
        await this.API.test();
    }

    static() {
        return express.static(global.storage.staticPath);
    }
}

module.exports = Router;