var express = require('express'),
    router = express.Router();

var mongoose = require('mongoose');
var Document = mongoose.model('MyModel');

/**
 * Document API for posting and getting documents
 * @param app
 * @param config
 */
module.exports = function (app, config) {
    app.use('/api', router);

    /**
     * Gets all documents
     */
    router.get('/document', function (req, res, next) {
        console.log('Get all documents', 'verbose');

        var query = Document.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if(result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: "No documents"});
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    /**
     * Posts a new document
     */
    router.post('/document', function (req, res, next) {
        console.log('Create document', 'verbose');

        var document = new Document(req.body);
        document.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            return next(err);
        });
    });
};
