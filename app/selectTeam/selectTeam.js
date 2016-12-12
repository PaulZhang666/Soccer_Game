'use strict';

var app = angular.module('myApp.selectTeam', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/selectTeam', {
    templateUrl: 'selectTeam/selectTeam.html',
    controller: 'selectTeamCtrl'
  });
}]);

app.controller('selectTeamCtrl', ['$scope', 'socket', '$cookies', selectTeamCtrl]);

function selectTeamCtrl($scope, socket, $cookies){

    $scope.setTeamOrder = function(order){
        if($scope.teamOrder == order){
            $scope.teamOrder = '-' + order;
        }
        else{
            $scope.teamOrder = order;
        }
    };

    $scope.teamOrder = 'overall';

    $scope.setInitialTeam = function(team){
        // if(!confirm("Sure to choose " + team.name + "?")){
        //     return;
        // }

        $scope.$emit("setInitialTeam", team);

        // alert("Congratulations! You have entered the Knockout Phase!");

        document.location.href = "#!/knockoff";

        for(var i = 0; i < $scope.teamList.length; i++){
            var index = Math.floor(Math.random()* 100) % ($scope.teamList.length - i) + i;
            if(index != i)
            {
                var tmp = $scope.teamList[i];
                $scope.teamList[i] = $scope.teamList[index];
                $scope.teamList[index]=tmp;
            }
        }

        $scope.$emit("uploadTeamList", $scope.teamList);

    };

    //var teamListQuery = "select * from FootballClub f, LineUp l where f.id = l.id";

    socket.emit('requestSocket', teamListQuery);

    socket.on('socketResult', function(data){
        $scope.teamList = data;
        $scope.teamOrder = 'overall';
        //$scope.apply();
        //location.reload();
    });

}