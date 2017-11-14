var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var TodoSchema = new Schema({
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
});

module.exports =
    Mongoose.model('MyModelTodos', TodoSchema);
