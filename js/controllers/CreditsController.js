app.controller('CreditsController', function ($scope, $http, tournament) {    
    console.log("CreditsController");
    $scope.Sent = false;
    $scope.postComments = function () {
        tournament.PostComments($scope.comments).success(function (response) {
            console.log('Post comment success');
            $scope.Sent = true;
        }).error(function () {
            console.log('POST comment error');
            console.log(response);
        });
        //$http({
        //    method  : 'POST',
        //    url     : 'http://127.0.0.1:8081/comment',
        //    data    : $scope.data, //form data
        //    headers : {'Content-Type': 'application/json'} 
        //}).success(function (response) {
        //    console.log('Post comment success');
        //    console.log(response);
        //}).error(function () {
        //    console.log('POST comment error');
        //    console.log(response);
        //});
    }
});