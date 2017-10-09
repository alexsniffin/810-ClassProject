var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    firstName: { type: String, requred: true },
    lastName: { type: String, requred: true },
    status: { type: Boolean, Default: true},
    email: { type: String, Required: unique },
    password: { type: String, Required: true},
    dateRegistered: { type: Date, Default: today }
});

var TodoSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    todo: { type: String, requred: true },
    description: { type: String, Required: true },
    dateCreated: { type: Date, Default: today },
    dateDue: { type: Date, Default: today },
    completed: { Type: Boolean, Default: false },
    file: {
        fileName: String,
        orginialName: String
    }
});

module.exports =
    Mongoose.model('MyModel', mySchema);
