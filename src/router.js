const express = require('express');
const API = require('./API.js');
const Locale = require('./locale.js');

class Router {
    constructor() {
        this.API = new API();
        this.locale = new Locale(global.storage.indexesPath, 'uk');
    }

    async onIndex(req, res) {
        let lang = 'uk';

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
}

module.exports = Router;