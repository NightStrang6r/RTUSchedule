import Logger from './logger.js';
import Storage from './storage.js';
import Server from './server.js';

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at: ', error);
});

let logger = new Logger();
global.logger = logger;
global.log = logger.log;
logger.printLogo();

let storage = new Storage();
global.storage = storage;

let server = new Server(3000);
server.run();