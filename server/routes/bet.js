module.exports = function(app) {
    app.route('/api/bet').post(function(req, res) {
        console.log(req.bets);
    });
}