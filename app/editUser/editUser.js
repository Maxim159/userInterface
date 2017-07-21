'use strict';

angular.module('myApp.editUser', ['ngRoute','ui.bootstrap.datetimepicker'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users/:userId', {
    templateUrl: 'editUser/editUser.html',
    controller: 'EsdtUsersCtrl'
  }).when('/users/:userId/recharge', {
    templateUrl: 'editUser/rechargeUser.html',
    controller: 'EsdtUsersCtrl'
  }).when('/users/:userId/transactions', {
    templateUrl: 'editUser/transactions.html',
    controller: 'TransactionsCtrl'
  });
}])

/*.directive("nav", function() {
    return {        
        restrict : "A",
        templateUrl: 'editUser/navEditUser.html'
    };
})*/

.controller('EsdtUsersCtrl', ['$scope','$http','$routeParams',function($scope,$http,$routeParams) {
    var self = $scope;
    self.userId = $routeParams.userId;
    var userDataEdit = {};
    var userBalance = {};
   
    $http.get('https://livedemo.xsolla.com/fe/test-task/baev/users/'+self.userId).then(function(response) {
        self.userList = response.data;
    });


    self.userEdit = function(){
      userDataEdit = {
        "user_name": self.userList.user_name,
        "user_custom": self.userList.user_custom,
        "email": self.userList.email,
        "enabled": self.userList.enabled
      };

      $http.put('https://livedemo.xsolla.com/fe/test-task/baev/users/'+self.userId, userDataEdit).then(function success (response) {
                    self.response=response.data;
                    
      });
    };

    self.userRecharge = function(){
      userBalance = {
        "amount": self.userList.balance,
        "comment": self.userList.comment
      };

      $http.post("https://livedemo.xsolla.com/fe/test-task/baev/users/"+self.userId+'/recharge', userBalance).then(function success (response) {
                    self.response=response.data;
                    
      });
    };

}])

.controller('TransactionsCtrl', ['$scope','$http','$routeParams',function($scope,$http,$routeParams) {
    var self = $scope;
    self.userId = $routeParams.userId;
   //self.data.dateStart='2014-10-14';
   //self.data.dateEnd='2017-07-15';

    self.onTimeSetStart = function (newDate, oldDate) {
        if(newDate != oldDate){
            var date = new Date(self.data.dateStart);
            self.data.dateStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            getDateTransactions(self.data.dateStart,self.data.dateEnd);
        }
    };
    self.onTimeSetEnd = function (newDate, oldDate) {
        if(newDate != oldDate){
            var date = new Date(self.data.dateEnd);
            self.data.dateEnd = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            getDateTransactions(self.data.dateStart,self.data.dateEnd);
        }
    };
    function getDateTransactions(dateStart,dateEnd){
            console.log(dateStart,dateEnd);
            if(!dateStart){
                var date = new Date();
                dateStart = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            }
            if(!dateEnd){
                var date = new Date();
                dateEnd = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            }
                $http.get('https://livedemo.xsolla.com/fe/test-task/baev/users/'+self.userId+'/transactions?datetime_from='+dateStart+'T00%3A00%3A00Z&datetime_to='+dateEnd+'T00%3A00%3A00Z').then(function(response) {
                self.transactionsList = response.data;
                });
            
            
    };
}]);