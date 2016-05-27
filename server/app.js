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
mongoose.connect('mongodb://' + mongoPass + '@ds019990.mlab.com:19990/premier-geek');



app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(expressSession({
    saveUninitialized: true,
    secret: 'keyboard cat',
    resave: true,
    cookie : { httpOnly: true, secure : false, maxAge : (4 * 60 * 60 * 1000)}

}));
app.use(passport.initialize());
app.use(passport.session());

// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });



initPassport(passport);
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 5555;
app.set('port', port);

app.listen(port, function () {
    console.log('Server running on port ' + port);
});

require('./routes/fixtures.js')(app);
require('./routes/authentication')(app, passport);
require('./routes/bet')(app);

app.get('*', function (request, response){
    response.sendFile(path.resolve(publicPath, 'index.html'))
})