import path from 'path';
import fs from 'fs';

const fsa = fs.promises;

class Storage {
    constructor() {
        this.configPath = this.getPath('src/config.json');
        this.staticPath = this.getPath('static');
        this.localesPath = this.getPath('src/locales.json');

        this.indexPath = `${this.staticPath}/index.html`;
        this.indexesPath = `${this.staticPath}/indexes`;

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

    getIndex() {
        let index = fs.readFileSync(this.indexPath, 'utf8');
        index = index.toString('utf8');
        return index;
    }

    getConfig() {
        return JSON.parse(fs.readFileSync(this.configPath));
    }

    getLocales() {
        let locales = fs.readFileSync(this.localesPath, 'utf8');
        locales = JSON.parse(this.locales);
        return locales;
    }

    saveLocales(langCode, translation) {
        fs.writeFileSync(`${this.indexesPath}/index_${langCode}.html`, translation);
    }

    async getTranslatedIndex(lang) {
        return await fsa.readFile(`${this.indexPath}`);

        // Change!!!
        return await fsa.readFile(`${this.indexesPath}/index_${lang}.html`);
    }
}

export default Storage;