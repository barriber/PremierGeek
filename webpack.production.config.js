var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.join(__dirname, 'public', 'build');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var srcPath = path.join(__dirname, 'app');
console.log('process.env.NODE_ENV ++++++' + process.env.NODE_ENV);
var config = {

    // We change to normal source mapping
    devtool: 'source-map',
    entry: path.join(srcPath, 'main.js'),
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less']
    },
    plugins: [
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin('styles.css')
        //new webpack.optimize.UglifyJsPlugin({
        //    compressor: {
        //        warnings: false
        //    }
        //})
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            },
            exclude: [nodeModulesPath]
        },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }, {
                test: /\.(otf|eot|svg|ttf|woff)/,
                loader: 'url-loader?limit=8192'
            }]
    }
};

module.exports = config;