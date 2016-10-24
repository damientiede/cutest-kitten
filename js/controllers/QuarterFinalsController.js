app.controller('QuarterFinalsController', function ($scope, $location, tournament) {
    $scope.Contests = tournament.GetContests();
    tournament.DrawQuarters();

});