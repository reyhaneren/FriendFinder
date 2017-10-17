var friendsList = require('../data/friends.js');

var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendsList);
    });

    app.post('/api/friends', function(req, res) {

        var bestMatch = {
            'name': 'none',
            'photo': 'none'
        };

        var userScores = req.body.scores;
        var userTotal = sum(req.body.scores);

        var friendTotal = 0;

        var closest = 50;

        friendsList.forEach(function(friend) {
            friendTotal = sum(friend.scores);
            var totalDifference = Math.abs(friendTotal - userTotal);
            if (totalDifference <= closest) {
                closest = totalDifference;
                bestMatch.name = friend.name;
                bestMatch.photo = friend.photo;
            }
        });

        function sum(array) {
            var total = 0;
            array.forEach(function(element) {
                total += parseInt(element);
            });
            return total;
        }

        res.json(bestMatch);

    });

};