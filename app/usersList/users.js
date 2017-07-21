'use strict';

angular.module('myApp.usersList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'usersList/users.html',
    controller: 'UsersCtrl'
  });
}])

.controller('UsersCtrl', ['$scope','$http',function($scope,$http) {
    var self = $scope;
    var offset = 0;
    var limitLoad = 10;
    var userDateLoad = {};
      
    
       $http.get('https://livedemo.xsolla.com/fe/test-task/baev/users?offset='+offset+'&limit='+limitLoad).then(function(response) {
        self.userList = response.data.data;
      });
    

    self.userCreate = function(){

      userDateLoad = {
        "user_id": self.inputUserId,
        "user_name": self.inputUserName,
        "user_custom": self.inputUserCustom,
        "email": self.inputUserEmail
      };

        $http.post("https://livedemo.xsolla.com/fe/test-task/baev/users", userDateLoad).then(function success (response) {
                    self.response=response.data;
                    
        });
      
      
    };

    /*self.userGet = function(user_id){
      $http.get('https://livedemo.xsolla.com/fe/test-task/baev/users/'+user_id).then(function success (response) {
                    self.response=response.data;
                    
      });
    };*/
}]);

