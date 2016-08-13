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
const mongoConnectionString = require('./globals').MONGO_CONNECTION;
const logger = require('./bunyanLogger');

const publicPath = path.join(__dirname, '..', 'client', 'public', 'build');

//conect to mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionString).then(function () {
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

app.all('*', function(req, res, next) {
    logger.info('====ALL REQUEST====');
    logger.info({req});
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

initPassport(passport);
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 5555;
app.set('port', port);
app.listen(port, function () {
    console.log('Server running on port ' + port);
    logger.info('Server running on port %d', port);
});

app.post('/football-data.events', (req, res) => {
    logger.info({req});
   res.send(200);
});

app.post('/footballData ', (req, res) => {
    logger.info('====football data event====');
    logger.info({req});
    res.send(200);
});

require('./routes/fixtures.js')(app);
require('./routes/authentication')(app, passport);
require('./routes/bet')(app);

