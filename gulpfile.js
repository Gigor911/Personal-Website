/**
 * Created by Игорь on 13.05.2016.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();



gulp.task('serve', function() {
    browserSync.init({
        files: ["./*"]
    });
    gulp.watch('./source/scss/**/*.scss', ['dev-sass']);
});


gulp.task('dev-sass', function () {
    gulp.src('./source/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false,
            remove: false
        }))
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});
gulp.task('prod-sass', function () {
    gulp.src('./source/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%'],
            cascade: false,
            remove: false
        }))
        .pipe(minify({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'))
});
gulp.task('watch', function () {
    gulp.watch('./source/scss/**/*.scss', ['dev-sass']);
});
