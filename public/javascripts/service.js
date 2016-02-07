app.factory('Todo',['$resource',function($resource) {//getting poll api
           return $resource('todo/:todoId', {},
           {
             query: { method: 'GET', params: { todoId: 'lists' }, isArray: true},
             update:{ method: 'PUT'},
             history:{method:'GET',params: {todoId: 'history' }, isArray:true},
             delete:{method:'DELETE'}
         })
       }]);

app.factory('User',['$resource',function($resource){
  return $resource('/user/:userName',{},
    {
      register:{method:'POST'},
      get:{method:'GET'},
      update:{method:'PUT'}
    })
}]);
