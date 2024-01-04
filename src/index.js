const Storage = require('./storage.js');
const Server = require('./server.js');

process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at: ', error);
});

let storage = new Storage();
global.storage = storage;

let server = new Server(3000);
server.run();