const express = require('express');

module.exports = function (app, passport) {
    app.get('/api/login', passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
    app.get('/api/logout', function (req, res) {
        req.logout();
        res.send();
        return;
    })
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
                userImage: req.user.imageUrl,
                isPaid: req.user._doc.isPaid || false
            });
            
            return;
        }
        res.send('notFound');
    });
}