var app = angular.module('myTodo',['ui.router','ngResource']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise("/home");

  $stateProvider
  .state('home',{
    url:'/home',
    templateUrl:'/templates/home.html',
    controller:'todoCtrl',
  })
  .state('profile',{
    url:'/profile',
    templateUrl:'/templates/profile.html',
    controller:'profileCtrl'
  })
  .state('store',{
    url:'/store',
    templateUrl:'/templates/store.html',
    controller:'storeCtrl'
  })
  .state('history',{
    url:'/history',
    templateUrl:'/templates/history.html',
    controller:'historyCtrl'
  })
  .state('register',{
    url:'/register',
    templateUrl:'/templates/register.html',
    controller:'registerCtrl'
  })
  ;
}]);
