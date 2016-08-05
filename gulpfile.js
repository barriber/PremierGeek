'use strict';

const gulp = require('gulp');
const hub = require('gulp-hub');
const install = require('gulp-install');
const gulpSequence = require('gulp-sequence');
const path = require('path');
const server = require('gulp-develop-server');
const clientGulp = path.join('./client/gulpfile.js');
const pm2 = require('pm2');
const git = require('gulp-git');
const appPath = path.join('./server/app.js')

gulp.task('hub:client', function () {
    hub([clientGulp]);
});

gulp.task('server:start', function () {
    const serverPath = path.join(appPath);
    server.listen({path: serverPath});
});

gulp.task('server:pm2', function () {
    pm2.connect(function (err) {
        if(err) {
            console.log(err);
            process.exit(2);
        }

        pm2.start({
            script: appPath,
            exec_mode: 'cluster',
            instances: 4,
            maxRestarts: 3
        })
    })

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
    ['webpack:build', 'server:pm2']));





