var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: Boolean, default: true},
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true},
    dateRegistered: { type: Date, default: Date.today }
});

/*var TodoSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true },
    todo: { type: String, requred: true },
    description: { type: String, Required: true },
    dateCreated: { type: Date, Default: Date.today },
    dateDue: { type: Date, Default: Date.today },
    completed: { Type: Boolean, Default: false },
    file: {
        fileName: String,
        orginialName: String
    }
});*/

module.exports =
    Mongoose.model('MyModel', UserSchema);
