'use strict'

var webpack = require('webpack');
require('html-webpack-plugin');
var path = require('path');
var srcPath = path.join(__dirname, 'app');
var buildPath = path.join(__dirname, 'public', 'build');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('styles.css')
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
        },{
            test: /\.less$/,
            loader: "style!css!less"
        },{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        ]
    }
};
