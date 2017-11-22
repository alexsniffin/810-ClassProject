var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport');

var mongoose = require('mongoose');
var Todo = mongoose.model('MyModelTodos');

var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/users/login').post(requireLogin, login);

    router.get('/todos', requireAuth, function (req, res, next) {
        logger.log('Get all todos', 'verbose');

        var query = Todo.find()
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

    router.get('/todos/:todoId',requireAuth, function (req, res, next) {
        logger.log('Get todo' + req.params.id, 'verbose');

        User.findById(req.params.todoId)
            .then(todo => {
                if(todo){
                    res.status(200).json(todo);
                } else {
                    res.status(404).json({message: "No todo found"});
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.post('/todos', requireAuth, function (req, res, next) {
        logger.log('Create Todo', 'verbose');
        var user = new Todo(req.body);

        user.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            return next(err);
        });
    });

    router.put('/todos/:todoId', requireAuth, function (req, res, next) {
        logger.log('Update todo' + req.params.id, 'verbose');

        User.findOneAndUpdate({_id: req.params.todoId}, req.body, {new:true, multi:false})
            .then(todo => {
                res.status(200).json(todo);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.delete('/todos/:todoId', requireAuth, function (req, res, next) {
        logger.log('Delete todo' + req.params.id, 'verbose');

        User.remove({ _id: req.params.todoId })
            .then(todo => {
                res.status(200).json({msg: "Todo Deleted"});
            })
            .catch(error => {
                return next(error);
            });
    });

};
