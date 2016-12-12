'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.selectTeam',
    'myApp.startPage',
    'myApp.knockoff',
    'myApp.battle',
    'myApp.lineUp',
    'myApp.players',
    'myApp.version'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/startPage'});
}]);

app.controller('mainCtrl', ['$scope', mainCtrl]);

app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:8100');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

function mainCtrl($scope){
    //$scope.test = "qqq";

    var point_0 = 0;

    $scope.resultList = [];

    $scope.$on('uploadTeamList', function(event, data){
        $scope.teamList = data;
    });

    $scope.$on('setInitialTeam', function(event, data){
        $scope.selectedTeam = data;
    });

    $scope.$on("eightTeam", function(event, data){
        $scope.eightTeamList = data;
    });
    $scope.$on("fourTeam", function(event, data){
        $scope.fourTeamList = data;
    });
    $scope.$on("twoTeam", function(event, data){
        $scope.twoTeamList = data;
    });
    $scope.$on("commitLineUp", function (event, data) {
        $scope.teamPlayerList = data;
    });
    $scope.$on("firstRound", function(event, data){
        $scope.point_1 = data[0];
        $scope.point_2 = data[1];
    });
    $scope.$on("secRound", function(event, data){
        $scope.point_3 = data[0];
        $scope.point_4 = data[1];
    });
    $scope.$on("commitChange", function(event, data){
        var change = data;
    });

}