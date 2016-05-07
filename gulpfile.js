'use strict';

const gulp = require('gulp');
const hub = require('gulp-hub');
const install = require('gulp-install');
const gulpSequence = require('gulp-sequence');

hub(['./client/gulpfile.js']);

gulp.task('install:client', function () {
    return gulp.src('./client/package.json').pipe(install());
});

gulp.task('init:client', gulpSequence(['install:client'], ['webpack:build']));
