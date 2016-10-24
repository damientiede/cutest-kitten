app.controller('LeaderboardController', function ($scope, $location,$http, tournament) {
    console.log('LeaderboardController');    
    //$scope.leaders = tournament.GetLeaders();
    //console.log('debug');
    $http.get('http://127.0.0.1/kitten-api.php/leaders').then(function (response) {
        console.log(response.data);
        $scope.leaders = response.data;
    });
    $scope.applyFormat = function () {
        if ($scope.format == true) {
            $('img').addClass('img-thumb');
        } else {
            $('img').removeClass('img-thumb');
        }
    }
});