'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.usersList',
  'myApp.editUser'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider/*.
        when('/usersList', {
          template: '<users></users>'
        }).
        when('/phones/:phoneId', {
          template: '<phone-detail></phone-detail>'
        })*/.otherwise({redirectTo: '/users'});
}]);
