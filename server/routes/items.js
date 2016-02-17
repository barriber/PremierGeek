module.exports = function  (app) {
    var teams = ['Manchester United', 'Arsenal', 'Liverpool', 'xxx'];

    app.route('/api/items').get(function(req, res) {
        res.send(teams);
    })
}