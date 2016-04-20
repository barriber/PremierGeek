var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');

process.env.PWD = process.cwd();
var pwdPublicPuth = path.join(process.env.PWD, 'public');

var app = new express();

//conect to mongoDB
var mongoPass = process.env.MLAB_SCHEME;
mongoose.connect('mongodb://'+ mongoPass + '@ds019990.mlab.com:19990/premier-geek');

app.use(express.static(pwdPublicPuth)).get('/', function (req, res) {
   res.sendFile('index.html', {
       root: pwdPublicPuth
   });
});

var proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;



if(!isProduction) {
    console.log('=====DEVELOPMENT MODE ======');
    var bundle = require('../server/bundle');

    bundle();
    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });
}

proxy.on('error', function() {
    console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
    console.log('Server running on port ' + port);
});

require('./routes/items.js')(app);
