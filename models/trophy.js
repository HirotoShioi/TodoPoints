var mongoose = require('mongoose');

var TrophySchema = new mongoose.Schema({
  trophyID:String,
  title:String,
  value:Number,
  trophy:String,
});

mongoose.model('Trophy',TrophySchema);
//idはautoIncrement
