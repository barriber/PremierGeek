'use strict'

var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();


var publicPath = path.join(__dirname, '..', 'client', 'public', 'build');


//conect to mongoDB
var mongoPass = process.env.MLAB_SCHEME;
mongoose.connect('mongodb://'+ mongoPass + '@ds019990.mlab.com:19990/premier-geek');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(publicPath));

var port = process.env.NODE_ENV === 'production' ? process.env.PORT : 5555;
app.set('port', port);

app.listen(port, function () {
    console.log('Server running on port ' + port);
});


require('./routes/items.js')(app);