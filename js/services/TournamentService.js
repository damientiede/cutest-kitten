'use strict';
app.factory('tournament', ['$http', '$q', function ($http, $q) {
    var participant = {};
    var contests = [];
    var round1 = [];
    var round2 = [];
    var quarterfinals = [];
    var semifinals = [];
    var final;
    var title = 'Round 1';
    var leaders = [];

    var contestants = [
        //{'Name':'Temika', 'Votes':0},
        {'Name':'Cleo & Cookie',Votes:0,imgUrl:'img/CleoAndCookie.png'},
        {'Name':'Emmi','Votes':0,imgUrl:'img/Emmi.png'},
        { 'Name': 'Destiny', 'Votes': 0, imgUrl: 'img/Destiny.png' },
        { 'Name': 'Laure', 'Votes': 0, imgUrl: 'img/Laure.png' },
        { 'Name': 'May', 'Votes': 0, imgUrl: 'img/May.png' },
        { 'Name': 'Avril', 'Votes': 0, imgUrl: 'img/Avril.png' },
        { 'Name': 'Mila', 'Votes': 0, imgUrl: 'img/Mila.png' },
        { 'Name': 'Minnie', 'Votes': 0, imgUrl: 'img/Minnie.png' },
        { 'Name': 'Ellie', 'Votes': 0, imgUrl: 'img/Ellie.png' },
        { 'Name': 'Lucy', 'Votes': 0, imgUrl: 'img/Lucy.png' },
        { 'Name': 'Ivory', 'Votes': 0, imgUrl: 'img/Ivory.png' },
        { 'Name': 'Kura', 'Votes': 0, imgUrl: 'img/Kura.png' },
        { 'Name': 'Angel', 'Votes': 0, imgUrl: 'img/Angel.png' },
        { 'Name': 'Vivi', 'Votes': 0, imgUrl: 'img/Vivi.png' },
        { 'Name': 'Layla', 'Votes': 0, imgUrl: 'img/Layla.png' },
        { 'Name': 'Clover', 'Votes': 0, imgUrl: 'img/Clover.png' },
        { 'Name': 'Torbie', 'Votes': 0, imgUrl: 'img/Torbie.png' },
        { 'Name': 'Tibby', 'Votes': 0, imgUrl: 'img/Tibby.png' },
        { 'Name': 'Smudge', 'Votes': 0, imgUrl: 'img/Smudge.png' },
        { 'Name': 'Inky', 'Votes': 0, imgUrl: 'img/Inky.png' },
        { 'Name': 'Tamzin', 'Votes': 0, imgUrl: 'img/Tamzin.png' },
        { 'Name': 'Butter', 'Votes': 0, imgUrl: 'img/Butter.png' },
        { 'Name': 'Zoe', 'Votes': 0, imgUrl: 'img/Zoe.png' },
        { 'Name': 'Plum', 'Votes': 0, imgUrl: 'img/Plum.png' },
        { 'Name': 'True', 'Votes': 0, imgUrl: 'img/True.png' },
        { 'Name': 'AJ', 'Votes': 0, imgUrl: 'img/AJ.png' },
        { 'Name': 'Kay', 'Votes': 0, imgUrl: 'img/Kay.png' },
        { 'Name': 'Arty', 'Votes': 0, imgUrl: 'img/Arty.png' },
        { 'Name': 'Nano', 'Votes': 0, imgUrl: 'img/Nano.png' },
        { 'Name': 'Cabby', 'Votes': 0, imgUrl: 'img/Cabby.png' },
        { 'Name': 'Lulu', 'Votes': 0, imgUrl: 'img/Lulu.png' },
        { 'Name': 'Ivy', 'Votes': 0, imgUrl: 'img/Ivy.png' }
    ];    
    
    var service = {
        Init:init,
        GetContestants: getContestants,
        UpVote: upVote,
        RoundTitle: roundTitle,
        GetParticipant: getParticipant,
        SetParticipant: setParticipant,
        GetContests: getContests,
        SaveContest: saveContest,        
        DrawRound2: drawRound2,
        DrawQuarters: drawQuarters,
        DrawSemis: drawSemis,
        Draw3rdPlaceFinal: draw3rdPlaceFinal,
        DrawFinal: drawFinal,
        PostResults: postResults,
        PostComments: postComments,
        GetLeaders: getLeaders,
        GetVisitors: getVisitors,
        GetComments: getComments
    };
    return service;

    function init() {
        title = 'Round 1';
        seedContests();
        console.log("tournament initialized :" + contestants.length);
    }
    function getContestants() {        
        return contestants;
    }

    function upVote(contestant) {
        for (var n=0; n < contestants.length; n++) {
            var cont = contestants[n];
            if (cont.Name == contestant.Name) {
                cont.Votes++;
                console.log('upVote(): '+contestant);
                return;
            }
        }        
    }
    function getParticipant() {
        return participant;
    }

    function setParticipant(p) {
        participant = p;
    }
    function getContests() {
        return contests;
    }
    function getRound1() {
        if (round1.length > 0) {
            return round1;
        }
    }
    function drawRound2() {
        title = 'Round 2';
        console.log('drawRound2');
        var n=0;
        while (n < 16) {
            var contest = {};          
            contest.Title = title + '/' + n;
            contest.ContestantA = contests[n].Winner;
            n++;
            contest.ContestantB = contests[n].Winner;
            contests.push(contest);
            n++;
        }
    }
    function drawQuarters() {
        title = 'Quarter finals';
        console.log('drawQuarters');
        var n = 16;
        while (n < 24) {
            var contest = {};
            contest.Title = title + '/' + n;
            contest.ContestantA = contests[n].Winner;
            n++;
            contest.ContestantB = contests[n].Winner;
            contests.push(contest);
            n++;
        }
    }
    function drawSemis() {
        title = 'Semi finals';
        console.log('semis');
        var n = 24;
        while (n < 28) {
            var contest = {};
            contest.Title = title + '/' + n;
            contest.ContestantA = contests[n].Winner;
            n++;
            contest.ContestantB = contests[n].Winner;
            contests.push(contest);
            n++;
        }
    }
    function draw3rdPlaceFinal() {
        title = '3rd place final';
        var contest = {};
        contest.Title = title;
        //first contestant is loser of contest 28
        if (contests[28].Winner.Name == contests[28].ContestantA.Name) {
            contest.ContestantA = contests[28].ContestantB;
        } else {
            contest.ContestantA = contests[28].ContestantA;
        }
        //second contestant is loser of contest 29
        if (contests[29].Winner.Name == contests[29].ContestantA.Name) {
            contest.ContestantB = contests[29].ContestantB;
        } else {
            contest.ContestantB = contests[29].ContestantA;
        }
        contests.push(contest);        
    }
    function drawFinal() {       
        var contest = {};
        contest.Title = 'Grand final';
        contest.ContestantA = contests[28].Winner;
        contest.ContestantB = contests[29].Winner;
        contests.push(contest);
    }
    function roundTitle() {
        return title;
    }
    function saveContest(contest,id) {
        contests[id] = contest;
    }
    function seedContests() {
        console.log("seedContests");
        var _contestants = getContestants();
        var copy = JSON.parse(JSON.stringify(_contestants));    //duplicate the array
        while (copy.length > 0) {
            var contest = {};
            var id = Math.floor((Math.random() * copy.length));
            contest.ContestantA = copy.splice(id, 1)[0];
            id = Math.floor((Math.random() * copy.length));
            contest.ContestantB = copy.splice(id, 1)[0];
            contests.push(contest);
        }
    }
    function postResults() {
        var results = {};
        results.Participant = participant;
        results.Contestants = contestants;
        console.log("postResults()");
        console.log(results);
        $http.post('http://127.0.0.1/kitten-api.php/results', results).success(function (response) {            
            participant.VisitorId = response.VisitorId;            
        }).error(function () {           
            console.log(response);
        });
    }
    function postComments(comment) {
        console.log('debug');
        var data = {};
        participant.Comments = comment;
        data.Participant = participant;        
        console.log(data);
        return $http({
            method: 'POST',
            url: 'http://127.0.0.1/kitten-api.php/comment',
            data: data, 
            headers: { 'Content-Type': 'application/json' }
        });
        //    .success(function (response) {
        //    console.log('Post comment success');                    
        //}).error(function () {
        //    console.log('POST comment error');
        //    console.log(response);
        //});
    }
    function getLeaders() {        
        return $http.get('http://127.0.0.1/kitten-api.php/leaders').then(function (response) {
            console.log(response.data);
            return response.data;
        });               
    }
    function getVisitors() {
        return $http.get('http://127.0.0.1/kitten-api.php/visitors');       
    }
    function getComments() {
        return $http.get('http://127.0.0.1/kitten-api.php/comments');
    }
}]);