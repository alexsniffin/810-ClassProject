var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {name: 'ToDo'},
        port: 5000,
        db: 'mongodb://127.0.0.1:27017/todo-dev'
    },
    test: {
        root: rootPath,
        app: {name: 'ToDo'},
        port: 3000,
        db: 'mongodb://127.0.0.1:27017/todo-test'
    },

    production: {
        root: rootPath,
        app: {name: 'ToDo'},
        port: 80,
        db: 'mongodb://127.0.0.1:27017/todo-prod'
    }
};

module.exports = config[env];
