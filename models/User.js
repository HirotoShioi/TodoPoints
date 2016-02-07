/*
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body:String,
  author:String,
  upvotes:{type:Number,default:0},
  post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'}
});


CommentSchema.methods.upvote = function(cb){
  this.upvotes += 1;
  this.save(cb);
}

mongoose.model('Comment',CommentSchema);
*/
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  userName:String,
  firstName:String,
  lastName:String,
  points:{type:Number,default:0},
});

UserSchema.methods.add = function(cb,point){
  this.points += point;
  this.save(cb);
}

mongoose.model('User',UserSchema);
