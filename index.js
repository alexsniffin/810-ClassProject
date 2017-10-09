var express = require('express');
//var path = require('path');
var config = require('./config/config');
var logger = require('./config/logger');

var app = express();

require('./config/express')(app, config);

logger.log('info', "Creating HTTP server on port: %s", config.port);
require('http').createServer(app).listen(config.port, function () {
    logger.log("HTTP Server listening on port:" + " " + config.port + " " + app.get('env') + "localhost:" + config.port);
});

module.exports = app;

/*
 ss.static(path.normalize(__dirname) + '/public'));

 app.use(function(req, res, next){
 console.log('Request from ' + req.ip);
 next();
 });

 app.get('/', function(req,res){
 res.send('Hello World!');
 });

 app.get('/about', function(req, res){
 res.send('About Us!');
 });


 app.use(function(req, res){
 res.type('text/plan');
 res.status(404);
 res.send('404 Not Found');
 });

 app.use(function(err, req, res, next){
 console.error(err.stack);
 res.type('text/plan');
 res.status(500);
 res.send('500 Sever Error');
 });

 app.listen(app.get('port'), function(){
 console.log('Express started on http://localhost:' + app.get('port'));
 });
 */
