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
    User.update({task_id:id,userName:myName},function(req,user){
      $scope.user.points += points;
    });
    Todo.update({_id:id,userName:myName},function(req,task){
      $scope.tasks.splice($scope.tasks.length-index-1,1);
    });
  };

}]);

app.controller('profileCtrl',['$scope','User',function($scope,User){
  $scope.user = User.get({userName:myName});
}]);

app.controller('storeCtrl',['$scope','Store','User',function($scope,Store,User){
  $scope.user = User.get({userName:myName});
  $scope.items = Store.get({userName:myName});
  $scope.buyItem = function(id,value){
    if($scope.user.point > value){
      Store.buy({userName:myName,itemID:id,value:value},function(res){
        console.log(res);
      });
      //diable the purchase button
      _.find($scope.items,{'trophyID':id}).purchased = true;
    }
  };
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
