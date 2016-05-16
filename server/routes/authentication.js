const express = require('express');
// const publicPath = path.join(__dirname, '..', 'client', 'public', 'build');

module.exports = function (app, passport) {
    app.get('/', function (req, res) {
        console.log(err);
    });
    app.get('/api/login', passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
    app.get('/auth/facebook/callback',
        function (req, res, next) {
            passport.authenticate('facebook', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.redirect('/login');
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.redirect('/');
                });
            })(req, res, next)
        });

    // app.route('/api/login').get(function (req, res) {
    //     console.log(D'login!!!!')
    //     passport.authenticate('facebook', { scope : 'email' });
    // });
    // app.route('/auth/facebook/callback').get(function(req, res) {
    //     console.log(req);
    //     passport.authenticate('facebook', {
    //         successRedirect : '/profile',
    //         failureRedirect : '/'
    //     });
    // })
}