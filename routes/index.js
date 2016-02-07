var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//db stuff
var db = mongoose.connect('mongodb://localhost:27017/todoPoint')

require('../models/todo');
var Todo = mongoose.model('Todo');

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
//db
require('../models/User');
var User = mongoose.model('User');

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
    res.json(user);
  });
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

module.exports = router;
