'use strict';

const gulp = require('gulp');
const hub = require('gulp-hub');
const install = require('gulp-install');
const gulpSequence = require('gulp-sequence');


gulp.task('hub', function() {
    console.log('======hub==========')
    hub(['./client/gulpfile.js']);
});

gulp.task('install:client', function () {
    console.log('======install==========')
    return gulp.src('./client/package.json').pipe(install({production: true}));
    console.log('======install END==========')
});

gulp.task('init:client', gulpSequence(['install:client'], 'webpack:build'));
