const path = require('path');
const fs = require('fs');
const fsa = require('fs').promises;

class Storage {
    constructor() {
        this.configPath = this.getPath('src/config.json');
        this.staticPath = this.getPath('static');
        //this.localesPath = this.getPath('src/locales.json');

        //this.indexPath = `${this.staticPath}/index.html`;
        //this.indexesPath = `${this.staticPath}/indexes`;

        this.config = this.getConfig();
    }

    getPath(staticPath) {
        if(fs.existsSync(staticPath)) {
            return path.resolve(staticPath);
        } else if(fs.existsSync(`../${staticPath}`)) {
            return path.resolve(`../${staticPath}`);
        } else {
            throw new Error(`No path found! Check that file with path ${staticPath} exists!`);
        }
    }

    getConfig() {
        return JSON.parse(fs.readFileSync(this.configPath));
    }
}

module.exports = Storage;