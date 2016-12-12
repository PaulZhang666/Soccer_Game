/**
 * Created by FuriosA on 30/11/2016.
 */
'use strict';

var app = angular.module('myApp.lineUp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/lineUp', {
        templateUrl: 'lineUp/lineUp.html',
        controller: 'lineUpCtrl'
    });
}]);

app.controller('lineUpCtrl', ['$scope', 'socket', lineUpCtrl]);

function lineUpCtrl($scope, socket){

    $scope.calAbility = function(){
        var sum = 0;
        var attack = 0;
        var attack_num = 0;
        var defence = 0;
        var defence_num = 0;
        for(var i = 0; i < 11; i++){
            if(i == 0){
                // GK
                if($scope.teamPlayerList[i].position == "GK"){
                    sum += $scope.teamPlayerList[i].overall;
                    defence += $scope.teamPlayerList[i].overall;
                    defence_num += 1;
                }else{
                    sum += $scope.teamPlayerList[i].overall * 0.6;
                    defence += $scope.teamPlayerList[i].overall * 0.6;
                    defence_num += 1;
                }
                continue;
            }
            if(((0 < i) && (i < 4) && ($scope.selectedTeam.formation == "343"))||
                ((0 < i) && (i < 5) && ($scope.selectedTeam.formation != "343"))){
                // DEF
                if($scope.teamPlayerList[i].position == "DEF"){
                    sum += $scope.teamPlayerList[i].overall;
                    defence += $scope.teamPlayerList[i].defence;
                    defence_num += 1;
                }else{
                    sum += $scope.teamPlayerList[i].overall * 0.6;
                    defence += $scope.teamPlayerList[i].defence * 0.6;
                    defence_num += 1;
                }
                continue;
            }
            if(((3 < i) && (i < 8) && ($scope.selectedTeam.formation == "343"))||
                ((4 < i) && (i < 10) && ($scope.selectedTeam.formation == "451"))||
                ((4 < i) && (i < 8) && ($scope.selectedTeam.formation == "433"))||
                ((4 < i) && (i < 9) && ($scope.selectedTeam.formation == "442"))){
                // MDF
                if($scope.teamPlayerList[i].position == "MDF"){
                    sum += $scope.teamPlayerList[i].overall;
                    defence += $scope.teamPlayerList[i].defence;
                    defence_num += 1;
                    attack += $scope.teamPlayerList[i].attack;
                    attack_num += 1;
                }else{
                    sum += $scope.teamPlayerList[i].overall * 0.6;
                    defence += $scope.teamPlayerList[i].defence * 0.6;
                    defence_num += 1;
                    attack += $scope.teamPlayerList[i].attack * 0.6;
                    attack_num += 1;
                }
                continue;
            }
            {
                // FWD
                if($scope.teamPlayerList[i].position == "FWD"){
                    sum += $scope.teamPlayerList[i].overall;
                    attack += $scope.teamPlayerList[i].attack;
                    attack_num += 1;
                }else{
                    sum += $scope.teamPlayerList[i].overall * 0.6;
                    attack += $scope.teamPlayerList[i].attack * 0.6;
                    attack_num += 1;
                }
            }
        }
        $scope.overall = Math.floor(sum/(11*0.93));
        $scope.defence = Math.floor(defence/(defence_num*0.93));
        $scope.attack = Math.floor(attack/(attack_num*0.93));
    };

    $scope.setFormation = function(formation){
        switch (formation){
            case "343":
                $scope.selectedTeam.formation = '343';
                $scope.showTFT = true;
                $scope.showFFO = false;
                $scope.showFTT = false;
                $scope.showFFT = false;
                break;
            case "451":
                $scope.selectedTeam.formation = '451';
                $scope.showTFT = false;
                $scope.showFFO = true;
                $scope.showFTT = false;
                $scope.showFFT = false;
                break;
            case "433":
                $scope.selectedTeam.formation = '433';
                $scope.showTFT = false;
                $scope.showFFO = false;
                $scope.showFTT = true;
                $scope.showFFT = false;
                break;
            case "442":
                $scope.selectedTeam.formation = '442';
                $scope.showTFT = false;
                $scope.showFFO = false;
                $scope.showFTT = false;
                $scope.showFFT = true;
                break;
        }
        $scope.calAbility();
    };

    //-----------------------------------------------------

    var playerListQ = playerOfTeamQuery + JSON.stringify($scope.selectedTeam.id);

    if(!$scope.teamPlayerList){
         socket.emit('requestSocket', playerListQ);
    }else{
        $scope.setFormation($scope.selectedTeam.formation);
    }

    socket.on('socketResult', function(data){
        $scope.teamPlayerList = data;
        $scope.setFormation($scope.selectedTeam.formation);
    });

    var referNum = "";

    $scope.changePlayer = function(player){
        if(referNum == ""){
            // first pick
            for(var i = 0; i < 22; i++){
                if($scope.teamPlayerList[i] == player){
                    referNum = i;
                    break;
                }
            }
            return;
        }else{
            //sec pick
            for(var i = 0; i < 22; i++){
                if($scope.teamPlayerList[i] == player){
                    var temp = $scope.teamPlayerList[referNum];
                    $scope.teamPlayerList[referNum] = $scope.teamPlayerList[i];
                    $scope.teamPlayerList[i] = temp;
                    referNum = "";
                    break;
                }
            }
            $scope.calAbility();
        }
    };

    $scope.commitLineUp = function(){
        $scope.$emit("commitLineUp", $scope.teamPlayerList);
        if(!$scope.eightTeamList){
            // 1/8
            var teamList = $scope.teamList;
            var iteration = 16;
        } else if(!$scope.fourTeamList){
            // 1/4
            var teamList = $scope.eightTeamList;
            var iteration = 8;
        } else if(!$scope.twoTeamList){
            // half
            var teamList = $scope.fourTeamList;
            var iteration = 4;
        }else{
            // final
            var teamList = $scope.twoTeamList;
            var iteration = 2;
        }
        for(var i = 0; i < iteration; i++){
            if(teamList[i] == $scope.selectedTeam){
                teamList[i].overall = $scope.overall;
                teamList[i].attack = $scope.attack;
                teamList[i].defence = $scope.defence;
                break;
            }
        }
    }


}