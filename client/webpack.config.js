'use strict'

var webpack = require('webpack');
require('html-webpack-plugin');
var path = require('path');
var srcPath = path.join(__dirname, 'app', 'main.js');
var buildPath = path.join(__dirname, 'public', 'build');
var pPath = path.join(__dirname, 'public');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry:  srcPath,
    output: {
        path: buildPath,
        publicPath: '',
        filename: 'app.js',
        pathinfo: true
    },
    plugins: [
        // new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('styles.css')
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    ],
    resolve: {
        root: path.join(__dirname, 'app'),
        extensions: ['', '.js', '.jsx']
    },
    // resolveLoader: {
    //     root: path.join(__dirname, 'node_modules')
    // },
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }]
    }
};
