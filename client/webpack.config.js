'use strict'

var webpack = require('webpack');
require('html-webpack-plugin');
var path = require('path');
var srcPath = path.join(__dirname, 'app', 'main.js');
var buildPath = path.join(__dirname, 'public', 'build');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: srcPath,
        vendor: ['react', 'redux', 'lodash', 'react-bootstrap']
    },
    output: {
        path: buildPath,
        publicPath: '',
        filename: '[name].js',
        pathinfo: true
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor'),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
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
