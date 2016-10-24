app.controller('DetailsController', function ($scope, $location, tournament) {
    $scope.Title = "Details";
    $scope.Name;
    $scope.City;
    $scope.Country;

    //console.log("DetailsController");
    $scope.NextClick = function () {       
        var participant = {};
        participant.Name = $scope.Name;
        participant.City = $scope.City;
        participant.Country = $scope.Country;
        participant.VisitorId = '';
        tournament.SetParticipant(participant);
        $location.url('tournament/0');
    }
});