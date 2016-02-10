var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  trophyID:String
});
var UserSchema = new mongoose.Schema({
  userName:String,
  firstName:String,
  lastName:String,
  points:{type:Number,default:0},
  item:[ItemSchema]
});

UserSchema.methods.add = function(cb,point){
  this.points += point;
  this.save(cb);
};

UserSchema.methods.buy = function(cb,point,trophy){
  this.points -= point;
  this.item.push({trophyID:trophy});
  this.save(cb);
};

UserSchema.methods.addTrophydesc = function(cb,trophy){
};
mongoose.model('User',UserSchema);
