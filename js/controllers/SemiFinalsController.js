app.controller('SemiFinalsController', function ($scope, $location, tournament) {
    $scope.Contests = tournament.GetContests();
    tournament.DrawSemis();

});