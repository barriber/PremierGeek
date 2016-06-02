'use strict';

const gulp = require('gulp');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');

gulp.task('webpack:build', function (callback) {
    const webpackBuildConf = Object.create(webpackConfig);
    webpackBuildConf.devtool = 'source-map';
    webpackBuildConf.debug = true;

    webpack(webpackBuildConf, function (err, stats) {
        if (err) {
            console.log('ERROR'); //FIXME
        }

        console.log(stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('webpack-dev-server', function () {
    const webpackBuildConf = Object.create(webpackConfig);
    webpackBuildConf.devtool = 'source-map';
    webpackBuildConf.debug = true;

    new WebpackDevServer(webpack(webpackBuildConf), {
        proxy: {
            '*': 'http://localhost:5555'
        }
    }).listen(8888, 'localhost',
        function (err) {
            if (err) {
                console.log(err);
            }
            console.log('success');
        });
});