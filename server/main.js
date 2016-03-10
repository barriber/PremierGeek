var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var buildPath = path.join(__dirname, 'public');

require('./database');


var app = new express();
var proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
console.log('=====server main ======');

app.use(express.static(buildPath))
    .get('/', function (req, res) {
        res.sendFile('index.html', {
            root: buildPath
        });
    }).listen(process.env.PORT || 8080, function (err) {
    if (err) { console.log(err) };
    console.log('Listening at localhost:8080');
})

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

