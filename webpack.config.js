'use strict'

var webpack = require('webpack');
require('html-webpack-plugin');
var path = require('path');
var srcPath = path.join(__dirname, 'app');
var buildPath = path.join(__dirname, 'public', 'build');

module.exports = {
    devtool : 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/only-dev-server',
        path.join(srcPath, 'main.js')
    ],
    output: {
        path:  buildPath,
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [ {
            test: /\.js$/,
            loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
            include: srcPath
        }]
    }
};
