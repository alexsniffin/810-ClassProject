var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

/**
 * Creates the Schema for our Document
 */
var DocumentSchema = new Schema({
    property1: { type: String },
    property2: { type: Number }
});

module.exports =
    Mongoose.model('MyModel', DocumentSchema);
