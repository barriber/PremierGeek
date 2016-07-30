'use strict';

const gulp = require('gulp');
const hub = require('gulp-hub');
const install = require('gulp-install');
const gulpSequence = require('gulp-sequence');
const path = require('path');
const server = require('gulp-develop-server');
const clientGulp = path.join('./client/gulpfile.js');
var git = require('gulp-git');

// We cannot load the internal gulpfiles if we didn't initialize the folders yet
//if (process.argv[process.argv.length - 1].indexOf('prod:deploy') !== 0) {
//    hub([clientGulp]);
//}

gulp.task('hub:client', function () {
    hub([clientGulp]);
});

gulp.task('server:start', function () {
    console.log('SERVER START====================')
    server.listen({path: './server/app.js'});
});

gulp.task('server:install', () => {
    
    return gulp.src('./server/package.json').pipe(install());
});

gulp.task('client:install', () => {
    return gulp.src('./client/package.json').pipe(install());
});

gulp.task('pull', function(){
    git.pull('git@github.com:barriber/PremierGeek.git', 'master', {args: '--rebase'}, function (err) {
        if (err) throw err;
    });
});

gulp.task('init:client', gulpSequence(['install:client'], ['webpack:build']));

gulp.task('prod:deploy', gulpSequence('pull', ['server:install', 'client:install'], 'hub:client',
    ['webpack:build', 'server:start']));





