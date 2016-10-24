app.controller('PodiumController', function ($scope, $location, tournament) {
    var contest = tournament.GetContests()[31];
    $scope.Winner = contest.Winner;
    if (contest.ContestantA.Name == $scope.Winner.Name) {
        $scope.RunnerUp = contest.ContestantB;
    } else {
        $scope.RunnerUp = contest.ContestantA;
    }
    $scope.Third = tournament.GetContests()[30].Winner;
    tournament.PostResults();
});