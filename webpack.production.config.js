var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.join(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
var srcPath = path.join(__dirname, 'app');


var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: path.join(srcPath, 'main.js'),
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            },
            exclude: [nodeModulesPath]
        }]
    }
};

module.exports = config;