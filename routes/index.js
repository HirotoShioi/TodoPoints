var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//db stuff
var db = mongoose.connect('mongodb://localhost:27017/todoPoint')

require('../models/todo');
var Todo = mongoose.model('Todo');
//db
require('../models/User');
var User = mongoose.model('User');

require('../models/trophy');
var Trophy = mongoose.model('Trophy');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task RPG' });
});

//todo API
router.get('/todo/lists',function(req,res,next){
  Todo.find({complete:false},{},function(err,todo){
    if(err){return next(err)};
    res.json(todo);
  });
});

router.get('/todo/history',function(req,res,next){
  Todo.find(function(err,todo){
    if(err) return next(err);
    res.json(todo);
  });
});

router.post('/todo',function(req,res,next){
  reqBody = req.body;
  //calculate point
  var base = 20;
  var points = req.body.difficulty * 0.5 * base;
  taskObj = {text:reqBody.text,difficulty:reqBody.difficulty,complete:reqBody.complete,points:points,postdate:new Date()};
  var task = new Todo(taskObj);

  task.save(function(err,doc){
    if(err || !doc){
      console.log(err);
    }else{
      res.json(task);
    }
  });
});

router.delete('/todo',function(req,res,next){
  reqBody = req.query;
  Todo.remove({_id:req.query},function(err){
    if(err) console.log(err);
  });
});

router.put('/todo',function(req,res){
  //find the task, add to the user points and update
  Todo.update({_id:req.body._id},{$set:{complete:true}},function(err,update){
    if(err) return;
    res.json(update);
  });
});

//User API
router.post('/user',function(req,res,next){
  var userObj = {userName:req.body.userName,firstName:req.body.firstName,lastName:req.body.lastName};
  var user = new User(userObj);
  user.save(function(err,user){
    if(err || !user) return next(err);
    res.json(user);
  });
});

router.get('/user/:userName',function(req,res){
  User.findOne({userName:req.params.userName},function(err,user){
    if(err || !user) return;
    //res.json(user);
    Trophy.find({},function(err,trophy){
      if(err || !trophy) return;
      var detailedUser = {_id:user._id,userName:user.userName,firstName:user.firstName,lastName:user.lastName,points:user.points,item:[]};
      for(i = 0; i < user.item.length;i++){
        detailedItem = {trophyID:user.item[i].trophyID};
          for(k = 0;k < trophy.length;k++){
            if(user.item[i].trophyID == trophy[k].trophyID){
              detailedItem.value = trophy[k].value;
              detailedItem.title = trophy[k].title;
              detailedItem.trophy = trophy[k].trophy;
              detailedUser.item.push(detailedItem);
              break;
            }//if
          }//for trophy
        }//for item
      res.json(detailedUser);
    });//Trophy.find
  });//User.findOne()
});

router.put('/user',function(req,res){
  var task_id = req.body.task_id;
  var userName = req.body.userName;
  Todo.findOne({_id:task_id},'points',function(err,task){
    if(err || !task) return err;
    User.findOne({userName:userName},function(err,user){
      user.add(function(err,added){
        if(err) return;
        res.json(user);
      },task.points);
    });
  });
});
//store API
router.get('/store/:username',function(req,res){
  var name = req.params.username;
  userTrophies = [];
  User.findOne({userName:name},function(err,user){
    Trophy.find({},function(req,trophy){
    for(k = 0;k < trophy.length;k++){
      aTrophy = {_id:trophy[k]._id,trophyID:trophy[k].trophyID,value:trophy[k].value,trophy:trophy[k].trophy,purchased:false};
      for(i = 0;i< user.item.length;i++){
          if(user.item[i].trophyID == trophy[k].trophyID){
            aTrophy.purchased = "true";
          }
        }
        userTrophies.push(aTrophy);
      }//for()
      res.json(userTrophies);
    });
  });
});

router.put('/store',function(req,res){
  var name = req.body.userName;
  var item = req.body.itemID;
  var point = req.body.value;
  User.findOne({userName:name},function(err,user){
    if(err || !user) return;
    if(user.points > point){
      user.buy(function(err,boughtUser){
        if(err || !boughtUser) return;
        res.json(boughtUser);
      },point,item);
    }
  });
});
module.exports = router;
