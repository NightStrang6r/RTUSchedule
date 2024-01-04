const express = require('express');

class Router {
    constructor() {
        
    }

    async onIndex(req, res) {
        res.setHeader('content-type', 'text/html');
        res.send("<h1>RTUSchedule Server</h1>");
    }

    static() {
        return express.static(global.storage.staticPath);
    }
}

module.exports = Router;