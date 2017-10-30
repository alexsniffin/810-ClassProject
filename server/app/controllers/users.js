var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');

var mongoose = require('mongoose');
var User = mongoose.model('MyModel');


module.exports = function (app, config) {
    app.use('/api', router);

    router.get('/users', function (req, res, next) {
        logger.log('Get all users', 'verbose');

        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if(result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: "No users"});
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.get('/user/:userId', function (req, res, next) {
        logger.log('Get user' + req.params.id, 'verbose');

        User.findById(req.params.userId)
            .then(user => {
                if(user){
                    res.status(200).json(user);
                } else {
                    res.status(404).json({message: "No user found"});
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.post('/user', function (req, res, next) {
        logger.log('Create User', 'verbose');
        var user = new User(req.body);

        user.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            return next(err);
        });
    });

    router.put('/user/:userId', function (req, res, next) {
        logger.log('Update user' + req.params.id, 'verbose');

        User.findOneAndUpdate({_id: req.params.userId}, req.body, {new:true, multi:false})
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.delete('/user/:userId', function (req, res, next) {
        logger.log('Delete user' + req.params.id, 'verbose');

        User.remove({ _id: req.params.userId })
            .then(user => {
                res.status(200).json({msg: "User Deleted"});
            })
            .catch(error => {
                return next(error);
            });
    });

    router.post('/login', function (req, res, next) {
        console.log(req.body);
        let email = req.body.email;
        let password = req.body.password;

        let obj = {'email': email, 'password': password};
        res.status(201).json(obj);
    });

};
