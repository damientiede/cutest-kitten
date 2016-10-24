app.controller('VisitorsController', function ($scope, $location, tournament) {
    console.log('VisitorsController');    
    tournament.GetVisitors().then(function (response) {
        console.log(response.data);
        $scope.Visitors = response.data;
    });
    $scope.formatDateShort = function (ts) {
        console.log(ts);
        var d = new Date(ts);
        return dateFormat(d, "dd mmmm yyyy HH:mm");
    }
});