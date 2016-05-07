'use strict';

const gulp = require('gulp');
const hub = require('gulp-hub');
hub(['./client/gulpfile.j']);
gulp.task('build', ['webpack:build']);