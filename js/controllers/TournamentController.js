app.controller('TournamentController', function ($scope, $routeParams, $location, tournament) {    
    $scope.Title = "Tournament";
    $scope.Num = $routeParams.Id;
    if ($routeParams.Id == 0) {
        tournament.Init();
    }
    $scope.Num++;
    $scope.roundTitle = tournament.RoundTitle();
    if ($scope.Num == 32) {
        $scope.roundTitle = 'Grand Final';
    }
    $scope.participant = tournament.GetParticipant();
    $scope.Contest = tournament.GetContests()[$routeParams.Id];       

    $('#row-contestants').removeClass('hidden');
    $('#row-contestants').fadeIn();

    $scope.Winner = function (contestant) {
        $scope.Contest.Winner = contestant;
        tournament.UpVote(contestant);

        var id = $routeParams.Id;

        switch (id) {
            case '15':
                $location.url('secondround');
                break;
            case '23':
                $location.url('quarterfinals');
                break;
            case '27':
                $location.url('semifinals');
                break;
            case '29':
                $location.url('3rdplacefinal');
                break;
            case '31':
                $location.url('podium');
                break;
            default:
                id++;
                $location.url('tournament/' + id);
                break;
        }
    }    

});