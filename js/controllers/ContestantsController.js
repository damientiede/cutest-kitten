app.controller('ContestantsController', function ($scope, $location, tournament) {
    console.log('ContestantsController');
    $scope.contestants = tournament.GetContestants();    
    console.log('ContestantsController:'+$scope.contestants.length);
    $scope.applyFormat = function () {
        if ($scope.format == true) {
            $('img').addClass('img-contestant');
        } else {
            $('img').removeClass('img-contestant');
        }
    }
});