/**
 * Created by FuriosA on 17/11/2016.
 */
'use strict';

var app = angular.module('myApp.knockoff', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/knockoff', {
        templateUrl: 'knockoffPage/knockoff.html',
        controller: 'knockoffCtrl'
    });
}]);

app.controller('knockoffCtrl', ['$scope', 'socket', '$cookies', knockoffCtrl]);

function knockoffCtrl($scope, socket, $cookies){

    $scope.show_8 = false;

    if($scope.eightTeamList){
        $scope.show_8 = true;
        $scope.knock8_1 = $scope.eightTeamList[0].logo;
        $scope.knock8_2 = $scope.eightTeamList[1].logo;
        $scope.knock8_3 = $scope.eightTeamList[2].logo;
        $scope.knock8_4 = $scope.eightTeamList[3].logo;
        $scope.knock8_5 = $scope.eightTeamList[4].logo;
        $scope.knock8_6 = $scope.eightTeamList[5].logo;
        $scope.knock8_7 = $scope.eightTeamList[6].logo;
        $scope.knock8_8 = $scope.eightTeamList[7].logo;
    }

    if($scope.fourTeamList){
        $scope.show_4 = true;
        $scope.knock4_1 = $scope.fourTeamList[0].logo;
        $scope.knock4_2 = $scope.fourTeamList[1].logo;
        $scope.knock4_3 = $scope.fourTeamList[2].logo;
        $scope.knock4_4 = $scope.fourTeamList[3].logo;
    }

    if($scope.twoTeamList){
        $scope.show_2 = true;
        $scope.knock2_1 = $scope.twoTeamList[0].logo;
        $scope.knock2_2 = $scope.twoTeamList[1].logo;
    }

    $scope.position_1 = $scope.teamList[0].logo;
    $scope.position_2 = $scope.teamList[1].logo;
    $scope.position_3 = $scope.teamList[2].logo;
    $scope.position_4 = $scope.teamList[3].logo;
    $scope.position_5 = $scope.teamList[4].logo;
    $scope.position_6 = $scope.teamList[5].logo;
    $scope.position_7 = $scope.teamList[6].logo;
    $scope.position_8 = $scope.teamList[7].logo;
    $scope.position_9 = $scope.teamList[8].logo;
    $scope.position_10 = $scope.teamList[9].logo;
    $scope.position_11 = $scope.teamList[10].logo;
    $scope.position_12 = $scope.teamList[11].logo;
    $scope.position_13 = $scope.teamList[12].logo;
    $scope.position_14 = $scope.teamList[13].logo;
    $scope.position_15 = $scope.teamList[14].logo;
    $scope.position_16 = $scope.teamList[15].logo;


}


