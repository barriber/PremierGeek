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
    server.listen({path: appPath});
});

gulp.task('server:pm2', function () {
    pm2.connect(function(err) {
        if (err) {
            console.error(err);
            process.exit(2);
        }

        pm2.start({
            script    : 'server/app.js',         // Script to be run
            exec_mode : 'cluster',        // Allow your app to be clustered
            instances : 2,                // Optional: Scale your app by 4
            max_memory_restart : '100M',
            maxMemoryRestart: 3
        }, function(err, apps) {
            pm2.disconnect();   // Disconnect from PM2
            if (err) {
                throw err
            }
        });
    });

});

gulp.task('server:install', () => {
    
    return gulp.src('./server/package.json').pipe(install());
});

gulp.task('client:install', () => {
    return gulp.src('./client/package.json').pipe(install());
});

gulp.task('pull', function(done){
    git.pull('git@github.com:barriber/PremierGeek.git', 'master', {args: '--rebase'}, function (err) {
        if (err) throw err;
        done();
    });
});

gulp.task('init:client', gulpSequence(['install:client'], ['webpack:build']));

gulp.task('prod:deploy', gulpSequence('pull', ['server:install', 'client:install'], 'hub:client',
    ['webpack:build', 'server:pm2']));





