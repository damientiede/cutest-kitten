var app = angular.module('cuteApp', ['ngRoute'])
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/tournament/:Id', {
            templateUrl: "templates/tournament.html",
            controller: 'TournamentController'
        })
        .when('/home', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })
        .when('/details', {
            templateUrl: 'templates/details.html',
            controller: 'DetailsController'
        })
        .when('/podium', {
            templateUrl: 'templates/podium.html',
            controller: 'PodiumController'
        })
        .when('/credits', {
            templateUrl: 'templates/credits.html',
            controller: 'CreditsController'
        })
        .when('/contestants', {
            templateUrl: 'templates/contestants.html',
            controller: 'ContestantsController'
        })
        .when('/secondround', {
            templateUrl: 'templates/secondround.html',
            controller: 'SecondRoundController'
        })
        .when('/quarterfinals', {
            templateUrl: 'templates/quarterfinals.html',
            controller: 'QuarterFinalsController'
        })
        .when('/semifinals', {
            templateUrl: 'templates/semifinals.html',
            controller: 'SemiFinalsController'
        })
        .when('/3rdplacefinal', {
            templateUrl: 'templates/3rdplacefinal.html',
            controller: '3rdPlaceFinalController'
        })
        .when('/leaderboard', {
            templateUrl: 'templates/leaderboard.html',
            controller: 'LeaderboardController'
        })
        .when('/visitors', {
            templateUrl: 'templates/visitors.html',
            controller: 'VisitorsController'
        })
        .when('/comments', {
            templateUrl: 'templates/comments.html',
            controller: 'CommentsController'
        })
        .otherwise({
            redirectTo: '/home'
        });
    $locationProvider.html5Mode(true);
});
