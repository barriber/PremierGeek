'use strict'

const gulp = require('gulp');
require('./gulpfile');

if (process.env.NODE_ENV === 'production') {
    console.log('=====PRODUCTION MODE ==========')
    gulp.start('init:client');
}