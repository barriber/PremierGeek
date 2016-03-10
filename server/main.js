var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

require('./database');


var app = new express();
var proxy = httpProxy.createProxyServer({
    changeOrigin: true
});

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
console.log('=====server main ======');
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

