var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');

/**
 * Sets up DB, MVC components, and routing
 * @param app
 * @param config
 */
module.exports = function (app, config) {

    console.log("Loading Mongoose functionality");

    // Used for promises outside ES6
    mongoose.Promise = require('bluebird');

    // DB connection
    mongoose.connect(config.db, {useMongoClient: true});

    // Check the connection
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });

    // Callback once connected
    mongoose.set('debug', true);
    mongoose.connection.once('open', function callback() {
        console.log("Mongoose connected to the database");
    });

    // Show connection requests
    app.use(function (req, res, next) {
        console.log('Request from ' + req.connection.remoteAddress);
        next();
    });

    // Set up body parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Load models
    var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
        require(model);
    });

    // Load controllers
    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller);
    });

    // Set base route
    app.get('/');

    // Set up controller route
    require('../app/controllers/document')(app, config);

    // Set up static routes
    app.use(express.static(config.root + '/public/'));

    // 404 response
    app.use(function (req, res) {
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    // 500 response
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Server Error');
    });

    console.log("Starting application");
};

