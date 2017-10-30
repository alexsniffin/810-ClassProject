var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

// Configuration settings
var config = {
    root: rootPath,
    app: {
        name: 'Exam'
    },
    port: 5000,
    db: 'mongodb://127.0.0.1:27017/document-exam'
};

module.exports = config;
