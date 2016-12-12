/**
 * Created by FuriosA on 17/11/2016.
 */
'use strict';

var app = angular.module('myApp.battle', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/battle', {
        templateUrl: 'battlePage/battle.html',
        controller: 'battleCtrl'
    });
}]);

app.controller('battleCtrl', ['$scope', 'socket', '$cookies', battleCtrl]);

function battleCtrl($scope, socket, $cookies){

    if(!$scope.eightTeamList){
        // 1/8
        var teamList = $scope.teamList;
        var iteration = 16;
        $scope.knockoff_state = "1/8 Game";
    } else if(!$scope.fourTeamList){
        // 1/4
        var teamList = $scope.eightTeamList;
        var iteration = 8;
        $scope.knockoff_state = "1/4 Game";
    } else if(!$scope.twoTeamList){
        // half
        var teamList = $scope.fourTeamList;
        var iteration = 4;
        $scope.knockoff_state = "Half Final";
    }else{
        // final
        var teamList = $scope.twoTeamList;
        var iteration = 2;
        $scope.knockoff_state = "Final";
        $scope.home_0 = $scope.home_1 = false;
    }
    for(var i = 0; i < teamList.length; i++){
        // get the opponent
        if(teamList[i] == $scope.selectedTeam){
            $scope.selectedTeamID = i;
            if(i % 2 == 0){
                // selected home first
                $scope.position_1 = $scope.selectedTeam.logo;
                $scope.position_2 = teamList[i + 1].logo;
                $scope.overall_0 = $scope.selectedTeam.overall;
                $scope.attack_0 = $scope.selectedTeam.attack;
                $scope.defence_0 = $scope.selectedTeam.defence;
                $scope.overall_1 = teamList[i + 1].overall;
                $scope.attack_1 = teamList[i + 1].attack;
                $scope.defence_1 = teamList[i + 1].defence;
                $scope.farTeam = teamList[i + 1];
                $scope.homeTeam = $scope.selectedTeam;
            }
            else{
                // selected far first
                $scope.position_1 = teamList[i - 1].logo;
                $scope.position_2 = $scope.selectedTeam.logo;
                $scope.overall_1 = $scope.selectedTeam.overall;
                $scope.attack_1 = $scope.selectedTeam.attack;
                $scope.defence_1 = $scope.selectedTeam.defence;
                $scope.overall_0 = teamList[i - 1].overall;
                $scope.attack_0 = teamList[i - 1].attack;
                $scope.defence_0 = teamList[i - 1].defence;
                $scope.farTeam = $scope.selectedTeam;
                $scope.homeTeam = teamList[i - 1];
            }
        }
    }

    if(!$scope.point_1 && $scope.point_1 != 0){
        $scope.point_1 = $scope.point_2 = $scope.point_3 = $scope.point_4 = "";
        $scope.home_0 = true;
        $scope.home_1 = false;
    }else if(!$scope.point_3 && $scope.point_3 != 0 && !$scope.twoTeamList){
        $scope.point_3 = $scope.point_4 = "";
        $scope.home_0 = false;
        $scope.home_1 = true;
    }
    //var resultList = [];
    var nextTeamList = [];

    $scope.calResult = function(){
        var p_1 = parseInt($scope.point_1);
        var p_2 = parseInt($scope.point_2);
        var p_3 = parseInt($scope.point_3);
        var p_4 = parseInt($scope.point_4);

        if($scope.twoTeamList && (p_1 || p_1 === 0)){
            // Final result
            if(p_1 >= p_2 && $scope.homeTeam == $scope.selectedTeam || p_1 <= p_2 && $scope.farTeam == $scope.selectedTeam){
                alert("Champion!");
            }else{
                alert("Second!");
            }
            return;
        }

        if($scope.point_3 != "" || $scope.point_3 === 0){
            // finished two games
            $scope.$emit("firstRound", ["", ""]);
            $scope.$emit("secRound", ["", ""]);

            if((p_1 + p_3 > p_2 + p_4)&&($scope.homeTeam == $scope.selectedTeam) ||
                (p_1 + p_3 < p_2 + p_4)&&($scope.homeTeam != $scope.selectedTeam) ||
                (p_1 + p_3 == p_2 + p_4)&&($scope.homeTeam == $scope.selectedTeam)&&(p_3 >= p_2) ||
                (p_1 + p_3 == p_2 + p_4)&&($scope.homeTeam != $scope.selectedTeam)&&(p_2 >= p_3)){
                alert("You win!");

                if(!$scope.eightTeamList){
                    // 1/8
                    var commitWord = "eightTeam";
                }else if(!$scope.fourTeamList){
                    // 1/4
                    //var iteration = 8;
                    var commitWord = "fourTeam";
                }else if(!$scope.twoTeamList){
                    // half
                    //var iteration = 4;
                    var commitWord = "twoTeam";
                }else{
                    alert("Success!!!");
                }

                for(var i  = 0; i < iteration; i+=2){
                    if(
                        ($scope.resultList[i] + $scope.resultList[i + iteration] > $scope.resultList[i + 1] + $scope.resultList[i + iteration + 1])||
                        (($scope.resultList[i] + $scope.resultList[i + iteration] == $scope.resultList[i + 1] + $scope.resultList[i + iteration + 1])&&($scope.resultList[i + 1] <= $scope.resultList[i + iteration]))
                    // 客场进球一样时候存主先的队 和 选择的不同。。。选择的一样选择的赢
                    ){
                        nextTeamList.push(teamList[i]);
                    }else{
                        nextTeamList.push(teamList[i + 1]);
                    }
                }
                $scope.resultList = [];
                $scope.$emit(commitWord, nextTeamList);

                document.location.href = "#!/knockoff";
            }else{
                alert("Lost!");
                document.location.href = "#!/startPage";
            }

        }
        else{
            if($scope.point_1 === ""){
                // first game
                $scope.home_0 = false;
                $scope.home_1 = true;
                var score_0 = 0;
                var score_1 = 0;
                for(var i = 0; i < iteration; i++){
                    var ran = Math.random();
                    if(i%2 == 0){
                        if(teamList[i].attack == teamList[i + 1].defence || teamList[i + 1].attack == teamList[i].defence){
                            score_0 = Math.floor(teamList[i].homwCourt_advantage/5 * ran + ran * 2 + 0.5);
                            score_1 = Math.floor(ran * 2 + 0.5);
                        }
                        else{
                            var differ = teamList[i].attack - teamList[i + 1].defence;
                            var differ_1 = teamList[i + 1].attack - teamList[i].defence;
                            score_0 = Math.floor((differ + 10)/15 + 50 * (ran - 0.5) / differ + teamList[i].homwCourt_advantage/5 * ran);
                            if(score_0 < 0){
                                score_0 = 0;
                            }
                            score_1 = Math.floor((differ_1 + 10)/15 + 50 * (ran - 0.5) / differ_1);
                            if(score_1 < 0){
                                score_1 = 0;
                            }
                        }
                        $scope.resultList.push(score_0);
                        $scope.resultList.push(score_1);

                        // first game first team at home
                        if(i == $scope.selectedTeamID || i == $scope.selectedTeamID - 1){
                            // show the selected team result
                            $scope.point_1 = $scope.resultList[i];
                            $scope.point_2 = $scope.resultList[i + 1];
                            $scope.$emit("firstRound", [$scope.point_1, $scope.point_2]);
                        }
                    }
                }
            }else{
                // sec game
                for(i = 0; i < iteration; i++){
                    ran = Math.random();

                    if(i%2 == 0){
                        if(teamList[i].attack == teamList[i + 1].defence || teamList[i + 1].attack == teamList[i].defence){
                            $scope.resultList.push(Math.floor(ran * 2 + 0.5));
                            $scope.resultList.push(Math.floor(teamList[i + 1].homwCourt_advantage/5 * ran + ran * 2 + 0.5));
                        }else{
                            var differ = teamList[i].attack - teamList[i + 1].defence;
                            var differ_1 = teamList[i + 1].attack - teamList[i].defence;
                            var score = (differ + 10)/15 + 50 * (ran - 0.5) / differ ;
                            if(score < 0){
                                score = 0;
                            }
                            var score_1 = (differ_1 + 10)/15 + 50*(ran - 0.5)/differ_1 + teamList[i + 1].homwCourt_advantage/5*ran;
                            if(score_1 < 0){
                                score_1 = 0;
                            }
                            $scope.resultList.push(Math.floor(score));
                            $scope.resultList.push(Math.floor(score_1));
                        }

                        // sec game first game at far
                        if(i == $scope.selectedTeamID || i == $scope.selectedTeamID - 1){
                            // show your score on the screen
                            $scope.point_3 = $scope.resultList[i + iteration];
                            $scope.point_4 = $scope.resultList[i + 1 + iteration];
                            $scope.$emit("secRound", [$scope.point_3, $scope.point_4]);
                        }
                    }
                }
                //$scope.point_3 = Math.floor(($scope.homeTeam.attack * (100+$scope.homeTeam.homwCourt_advantage)/100)/$scope.farTeam.defence * ran);
                //$scope.point_4 = Math.floor($scope.farTeam.attack/($scope.homeTeam.defence*(100+$scope.homeTeam.homwCourt_advantage)/100) * ran);
            }
        }
    }
}