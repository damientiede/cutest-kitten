app.controller('CommentsController', function ($scope, $location, tournament) {
    console.log('CommentsController');
    tournament.GetComments().then(function (response) {
        console.log(response.data);
        $scope.Comments = response.data;
    });
    $scope.getTimeStamp = function (comment) {
        var d = new Date(comment.TimeStamp);
        return dateFormat(d, "dd mmmm yyyy");
    }

});