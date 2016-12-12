'use strict';

var app = angular.module('myApp.startPage', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/startPage', {
    templateUrl: 'startPage/startPage.html',
    controller: 'startPageCtrl'
  });
}]);

app.controller('startPageCtrl', ['$scope', startPageCtrl]);

function startPageCtrl($scope){

}