var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true},
    todo: {type: String, required: true},
    description: {type: String, required: true},
    dateCreated: {type: Date, default: Date.today},
    dateDue: {type: Date, default: Date.today},
    completed: {type: Boolean, default: false},
    priority: {type: String},
    file: {
        filename: String,
        originalName: String,
        dateUploaded: Date
    }
});

module.exports =
    Mongoose.model('MyModelTodos', TodoSchema);
