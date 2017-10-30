var express = require('express');
var config = require('./config/config');

// Start express
var app = express();

require('./config/express')(app, config);

console.log("Creating HTTP server on port: %s " + config.port);

// Start http server
require('http').createServer(app).listen(config.port, function () {
    console.log("HTTP Server listening on localhost:" + config.port);
});

module.exports = app;
