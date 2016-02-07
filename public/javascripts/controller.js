//angular controllers
var myName = "shioihi";
app.controller('userCtrl',['$scope','User',function($scope,User){
  $scope.user = User.get({userName:myName});
}]);

app.controller('todoCtrl',['$scope','Todo','User',function($scope,Todo,User){
  $scope.user = User.get({userName:myName});
  $scope.tasks = Todo.query();
  $scope.title = "Task RPG";

  $scope.addTask = function(){
     var task = {userName:myName,text:$scope.text,difficulty:$scope.difficulty,complete:false};
     var newTask = new Todo(task);
     newTask.$save(function(req,task){
       $scope.tasks.push(newTask);
       $scope.text = "";
       $scope.difficulty = false;
     });
  };

  $scope.doneTask = function(id,index,points){
    removeTask = new Todo({_id:id});
    User.update({task_id:id,userName:myName},function(req,user){
      console.log("user updated");
      $scope.user.points += points;
    });
    Todo.update({_id:id,userName:myName},function(req,task){
      console.log("update complete");
    });
    $scope.tasks.splice(index,1);
  };

}]);

app.controller('profileCtrl',['$scope','User',function($scope,User){
  $scope.user = User.get({userName:myName});

  $scope.trophies = [
    {type:"fa fa-spinner fa-spin fa-5x"},
    {type:"fa fa-circle-o-notch fa-spin fa-5x"},
    {type:"fa fa-refresh fa-spin fa-5x"}
  ];
}]);

app.controller('purchaseCtrl',['$scope',function($scope){
  $scope.items = [
    {type:"fa fa-spinner fa-spin fa-5x",text:"around the world"},
    {type:"fa fa-circle-o-notch fa-spin fa-5x",text:"point the hole"},
    {type:"fa fa-refresh fa-spin fa-5x",text:"infinity"}
  ];
}]);

app.controller('historyCtrl',['$scope','Todo','User',function($scope,Todo,User){
  $scope.user = User.get({userName:myName});
  $scope.histories = Todo.history();
}]);

app.controller('registerCtrl',['$scope','User',function($scope,User){
  $scope.register = function(){
    var newUser = {
      userName:$scope.userName,
      firstName:$scope.firstName,
      lastName:$scope.lastName
    };
    User.register(newUser,function(err){
      console.log(err);
      $scope.userName = "";
      $scope.firstName = "";
      $scope.lastName = "";
    });
  };
}]);
