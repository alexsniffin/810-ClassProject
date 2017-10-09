(function () {

    'use strict';

    let express = require('express'),
        router = express.Router(),
        logger = require('../../config/logger');

    module.exports = function (app, config) {
        app.use('/api', router);
        router.get('/users', function (req, res, next) {
            logger.log('Get all users', 'verbose');
            res.status(200).json({message: 'Get All Users'});
        });
        router.get('/user/:userId', function (req, res, next) {
            logger.log('Get user' + req.params.id, 'verbose');

            res.status(200).json({message: 'Get User' + req.params.id});
        });

        router.post('/users', function (req, res, next) {
            logger.log('Create User', 'verbose');
            res.status(201).json({message: 'Create User' + req.params.id});
        });

        router.put('/user/:userId', function (req, res, next) {
            logger.log('Update user' + req.params.id, 'verbose');

            res.status(200).json({message: 'Update User' + req.params.id});
        });

        router.delete('/user/:userId', function (req, res, next) {
            logger.log('Delete user' + req.params.id, 'verbose');

            res.status(200).json({message: 'Delete User' + req.params.id});
        });

        router.post('/login', function (req, res, next) {
            console.log(req.body);
            let email = req.body.email;
            let password = req.body.password;

            let obj = {'email': email, 'password': password};
            res.status(201).json(obj);
        });

    };
})();
