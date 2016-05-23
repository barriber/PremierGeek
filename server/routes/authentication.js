const express = require('express');

module.exports = function (app, passport) {
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
    app.route('/api/session/verify').get(function (req, res) {
        if(req.isAuthenticated()) {
            res.send({
                firstName: req.user.firstName,
                userImage: req.user.imageUrl
            });
            
            return;
        }
        res.send('notFound');
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