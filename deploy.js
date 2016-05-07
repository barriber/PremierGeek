'use strict'

var path = require('path');
const gulp = require('gulp');
require('./gulpfile');


// const webpackPath = path.join(__dirname, '..', 'client', 'webpack.config.js');
//
// process.env.PWD = process.cwd();
// var pwdPublicPuth = path.join(process.env.PWD,  'client', 'webpack.config.js');
//
// console.log('----' + pwdPublicPuth);
// console.log('++++' + webpackPath);
if (process.env.NODE_ENV === 'production') {
    console.log('=====PRODUCTION MODE ==========')
    var child_process = require('child_process');
    gulp.start('init:client');
    // child_process.exec(`webpack -p --config  ${pwdPublicPuth}`, function (error, stdout, stderr) {
    //     if (error !== null) {
    //         console.log('exec error: ' + error);
    //     }
    // });
}