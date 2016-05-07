'use strict'

const webpack = require('webpack');
const path = require('path');
const srcPath = path.join(__dirname, 'app', 'main.js');
const buildPath = path.join(__dirname, 'public', 'build');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    resolve: {
        root: path.join(__dirname, 'app'),
        extensions: ['', '.js', '.jsx']
    },
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
