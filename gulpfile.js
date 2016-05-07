'use strict';

const gulp = require('gulp');
const hub = require('gulp-hub');
const install = require('gulp-install');
const gulpSequence = require('gulp-sequence');
var path = require('path');
const webpackPath = path.join(__dirname, 'client', 'package.json');


gulp.task('hub', function() {
    console.log('======hub==========')
    hub(['./client/gulpfile.js']);
});

gulp.task('install:client', function () {
    console.log('======install==========')
    console.log(webpackPath);
    return gulp.src(webpackPath).pipe(install({production: true}));
    console.log('======install END==========')
});

gulp.task('init:client', gulpSequence('install:client'));
