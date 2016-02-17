var gulp = require('gulp');
var gls = require('gulp-live-server');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var sourcemaps = require('gulp-sourcemaps');

var server = gls.new(['./server/main.js'], 8080);
gulp.task('serve', function () {
    server.start();
});

gulp.task('browserify', function() {
    var bundler = browserify({
        entries: 'app/main.jsx',
        transform: [reactify],
        debug: true,
        cache: {}, packageCache: {}, fullPaths: true

    });

    var watcher = watchify(bundler);

    return watcher.on('update', function(file) {

        var updateStart = Date.now();
        console.log('Updating');
        watcher.bundle()
        .pipe(source('main.jsx'))
        .pipe(gulp.dest('./.tmp'));
        console.log('Update finished ', (Date.now - updateStart) + 'ms');
        console.log(file + '-----------')
        server.notify.bind(server)(file);
        server.start.bind(server)();
        //server.notify.bind(server)(file);
    })
    .bundle()
    .pipe(source('main.jsx'))
    .pipe(gulp.dest('./.tmp'));
    server.start.bind(server)();
    server.notify.bind(server)(file);
});

gulp.task('test', function() {
    gulp.watch('app/**/*.js', function(file) {
        var bundler = browserify({
            entries: 'app/main.jsx',
            transform: [reactify],
            debug: true,
            cache: {}, packageCache: {}, fullPaths: true
        });

        bundler.bundle()
        .pipe(source('main.jsx'))
        .pipe(gulp.dest('./.tmp'));
        server.start.bind(server)();
        server.notify.bind(server)(file);




    })
});

gulp.task('css', function () {
    gulp.watch('app/styles/**/*.css', function(file) {
        server.start.bind(server)();
        server.notify.bind(server)(file);
        return gulp.src(['app/styles/**/*.css'])
        //.pipe(concat('main.css'))
        .pipe(gulp.dest('./.tmp'));

    });
});

gulp.task('default', ['browserify', 'css'], function() {
    server.start();
});