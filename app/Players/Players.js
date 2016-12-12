/**
 * Created by FuriosA on 30/11/2016.
 */
'use strict';

var app = angular.module('myApp.players', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/Players', {
        templateUrl: 'Players/Players.html',
        controller: 'playersCtrl'
    });
}]);

app.controller('playersCtrl', ['$scope', 'socket', playersCtrl]);

function playersCtrl($scope, socket){
    socket.emit("requestSocket", allPlayerQuery);
    socket.on("socketResult", function(data){
        if(data[0]){
            $scope.playerList = data;
        }

    });

    $scope.setPlayerOrder = function(order){
        if($scope.playerOrder == order){
            $scope.playerOrder = '-' + order;
        }
        else{
            $scope.playerOrder = order;
        }
    };

    $scope.refer = false;

    $scope.reference = "";

    $scope.setRefer = function(player){
        $scope.reference = player;
    };

    $scope.updatePlayer = function(player){
        $scope.uplayer = player;
    };

    $scope.saveUpdate = function(player){
        var updatePlayerQuery = "update Player set overall = "
            + JSON.stringify(player.overall) + ", attack = "
            + JSON.stringify(player.attack) + ", defence = "
            + JSON.stringify(player.defence) + " where p_name = '" + player.p_name + "'";

        socket.emit("requestSocket", updatePlayerQuery);
    };

    $scope.calRadar = function(player){
        var myChart = echarts.init(document.getElementById('radarGraph'));

        var option = {
            title: {
                text: ''
            },
            tooltip: {},
            radar: {
                // shape: 'circle',
                indicator: [
                    { name: 'Total', max: 100},
                    { name: 'Attack', max: 100},
                    { name: 'Defence', max: 100},
                    { name: 'Stamina', max: 100},
                    { name: 'InjuryResistance', max: 5}
                ]
            }
        };

        if($scope.reference != ""){
            option.legend = {
                data: [$scope.reference.p_name, player.p_name]
            };
            option.series = {
                type: 'radar',
                data : [
                    {
                        value : [$scope.reference.overall, $scope.reference.attack, $scope.reference.defence, $scope.reference.stamina, $scope.reference.injuryResistance],
                        name : $scope.reference.p_name
                    },
                    {
                        value : [player.overall, player.attack, player.defence, player.stamina, player.injuryResistance],
                        name : player.p_name
                    }
                ]
            }
        }else{
            option.legend = {
                data: [player.p_name]
            };
            option.series = [{
                //name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [player.overall, player.attack, player.defence, player.stamina, player.injuryResistance],
                        name : player.p_name
                    }
                ]
            }];
        }

        myChart.setOption(option);
    };



}

