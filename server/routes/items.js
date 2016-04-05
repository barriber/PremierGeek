require('isomorphic-fetch');
var _ = require('lodash');

var handleFixtureObj = function(allGames) {
    var unplayedMatches = _.chain(allGames).groupBy('status').get('TIMED').value();
    var z = _.groupBy(unplayedMatches,'matchday');
    console.log('GRROUUP BYYYYYY');
    console.log(z);
    _.forEach(unplayedMatches, fixtures => {
        fixtures.matchday = fixtures.matchday.toString();
    });
    var x = _.groupBy(unplayedMatches,'matchday');
    var nextRoundNumber = _.findKey(unplayedMatches, function(matchDay) {
        return matchDay.length === 10; //TODO Assume there are 10 games per league, need to be changed for Multiple leagues
    });

    var i = 0;
    return _.map(unplayedMatches[nextRoundNumber], (fixture) => {
        return  _.assign(fixture, {bet: 'x', id: ++i});
    });_
}
module.exports = function (app) {


    app.route('/api/items').get(function (req, res) {
        fetch('http://api.football-data.org/v1/soccerseasons/398/fixtures', {
            headers: { 'X-Auth-Token': '5aab4c2c6c8a4af188e5be626459fb78'},
        }).then(response => response.json())
            .then(json => {
                res.send(handleFixtureObj(json.fixtures));
            })
    })
}