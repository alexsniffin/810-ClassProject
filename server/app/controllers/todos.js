var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var mongoose = require('mongoose');
var Todo = mongoose.model('MyModelTodos');

var requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/users/login').post(requireLogin, login);

    router.get('/todos', function (req, res, next) {
        logger.log('Get all todos', 'verbose');

        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if(result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: "No todos"});
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.get('/todos/:todoId', function (req, res, next) {
        logger.log('Get user' + req.params.id, 'verbose');

        User.findById(req.params.todoId)
            .then(user => {
                if(user){
                    res.status(200).json(user);
                } else {
                    res.status(404).json({message: "No todo found"});
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.post('/todos', function (req, res, next) {
        logger.log('Create Todo', 'verbose');
        var user = new User(req.body);

        user.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            return next(err);
        });
    });

    router.put('/todos/:todoId', function (req, res, next) {
        logger.log('Update user' + req.params.id, 'verbose');

        User.findOneAndUpdate({_id: req.params.todoId}, req.body, {new:true, multi:false})
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.delete('/todos/:todoId', function (req, res, next) {
        logger.log('Delete todo' + req.params.id, 'verbose');

        User.remove({ _id: req.params.todoId })
            .then(user => {
                res.status(200).json({msg: "Todo Deleted"});
            })
            .catch(error => {
                return next(error);
            });
    });

};
