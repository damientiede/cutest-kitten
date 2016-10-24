app.controller('3rdPlaceFinalController', function ($scope, $location, tournament) {
    $scope.Contests = tournament.GetContests();    
    tournament.Draw3rdPlaceFinal();
    tournament.DrawFinal();
});