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

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(publicPath));
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    maxAge: 360*5,
    saveUninitialized: true,
    cookie: {secure: true}
}));
app.use(passport.initialize());
app.use(passport.session());



initPassport(passport);
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 5555;
app.set('port', port);

app.listen(port, function () {
    console.log('Server running on port ' + port);
});

require('./routes/items.js')(app);
require('./routes/authentication')(app, passport);

app.get('*', function (request, response){
    response.sendFile(path.resolve(publicPath, 'index.html'))
})