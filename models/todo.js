
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  userName:String,
  text:String,
  difficulty:Number,
  complete:false,
  points:{type:Number,default:0},
  postdate:Date
});

mongoose.model('Todo',TodoSchema);
