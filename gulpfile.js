var gulp = require('gulp'),
    gutil = require('gulp-util'),
    guseref = require('gulp-useref'),
    guglify = require('gulp-uglify'),
    gif = require('gulp-if'),
    gcssmin = require('gulp-cssmin'),
    browserSync = require('browser-sync'),
    del = require('del');

// Cleaning
gulp.task('clean', function () {
    return del.sync(['public/js/*.js', 'public/css/*.css']);
});

// Server
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: 'public',
            open: true,
            notify: false,
            logLevel: "silent"
        }
    })
}).on('error', gutil.log);

gulp.task('serve-debug', ['serve', 'watch']).on('error', gutil.log);

// Building HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(guseref())
        .pipe(gif('*.js', guglify()))
        .pipe(gif('*.css', gcssmin()))
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('html-debug', function () {
    return gulp.src('app/*.html')
        .pipe(guseref())
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

// Partials
gulp.task("partials", function () {
    return gulp.src('app/views/**/*.html')
        .pipe(gulp.dest('public/views/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

// Watch tasks
gulp.task('watch', function () {
    gulp.watch("app/index.html", ['html-debug']);
    gulp.watch('app/js/*.js', ['html-debug']);
    gulp.watch('app/js/**/*.js', ['html-debug']);
    gulp.watch('app/partials/*.html', ['partials']);
    gulp.watch('app/css/*.css', ['html-debug']);
});

// Adding mock data task
gulp.task("mock", function () {
    return gulp.src(['dashboard/**/*']).pipe(gulp.dest('public/dashboard'));
});

// Building tasks
gulp.task('default', [
    'clean',
    'mock',
    'partials',
    'html']).on('error', gutil.log);

gulp.task('debug', [
    'clean',
    'mock',
    'partials',
    'html-debug']).on('error', gutil.log);