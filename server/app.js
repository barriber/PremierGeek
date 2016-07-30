'use strict'
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const app = express();
const passport = require('passport');
const initPassport = require('./passport/init');
const _ = require('lodash');

const publicPath = path.join(__dirname, '..', 'client', 'public', 'build');

//conect to mongoDB
const mongoPass = process.env.MLAB_SCHEME;
mongoose.connect('mongodb://' + mongoPass + '@ds019990.mlab.com:19990/premier-geek').then(function () {
}).catch(function(e) {
    console.log(e);
});



app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(expressSession({
    saveUninitialized: true,
    secret: 'keyboard cat',
    resave: true,
    cookie : { httpOnly: true, secure : false, maxAge : 3600000*24*365}

}));
app.use(passport.initialize());
app.use(passport.session());


initPassport(passport);
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 5555;
app.set('port', port);

app.listen(port, function () {
    console.log('Server running on port ' + port);
});

app.get('/', function(req, res) {
    console.log('-------got EVENT---------');
    // res.send(apiToken)
});

app.post('*', function (req, res) {
    console.log('recive!!!!!!');
})

app.post('/', function (req, res) {
    console.log('recive!!!!!!');
})

app.put('*', function (req, res) {
    console.log('recive!!!!!!');
})

app.put('/', function (req, res) {
    console.log('recive!!!!!!');
})

app.get('*', function(req, res) {
    console.log('-------got EVENT---------');
    console.log(req.originalUrl);
    // res.send(apiToken)
});

require('./routes/fixtures.js')(app);
require('./routes/authentication')(app, passport);
require('./routes/bet')(app);

