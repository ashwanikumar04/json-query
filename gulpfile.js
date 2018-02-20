var gulp = require('gulp'),
    gutil = require('gulp-util'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename');
var cachebust = require('gulp-cache-bust');
var exec = require('child_process').exec;
var dateTimeUtils = require('./utils/date-time-util');
dateTimeUtils.setMoment();

var localUrl = "http://localhost/";
var releaseDomain = "jq.ashwanik.in";
var releaseUrl = "http://jq.ashwanik.in/";

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');

function development() {
    gutil.log('Starting development task!');
    gulp.src(['config_template.js'])
        .pipe(replace("{serverURL}", localUrl))
        .pipe(replace("{serverDomain}", 'localhost'))
        .pipe(replace("{environment}", 'development'))
        .pipe(replace("\"{debug}\"", 'true'))
        .pipe(replace("\"{dbDebug}\"", 'true'))
        .pipe(rename("config.js"))
        .pipe(gulp.dest('.'));
    gulp.src(['apidoc_template.json'])
        .pipe(replace("{serverURL}", localUrl))
        .pipe(rename("apidoc.json"))
        .pipe(gulp.dest('.'));
    gutil.log('Completed development task!');

}


function createTemplate() {
    exec('apidoc -i routes/ -o public/docs/ -t template/', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
}

gulp.task('default', function () {
    development();
});

gulp.task('development', function () {
    development();
});

gulp.task('release', function () {
    gutil.log('Starting release task!');
    gulp.src(['config_template.js'])
        .pipe(replace("{serverURL}", releaseUrl))
        .pipe(replace("{serverDomain}", releaseDomain))
        .pipe(replace("{environment}", 'development'))
        .pipe(replace("\"{debug}\"", 'false'))
        .pipe(replace("\"{dbDebug}\"", 'false'))
        .pipe(rename("config.js"))
        .pipe(gulp.dest('.'));
    gulp.src(['apidoc_template.json'])
        .pipe(replace("{serverURL}", releaseUrl))
        .pipe(rename("apidoc.json"))
        .pipe(gulp.dest('.'));
    gutil.log('Completed release task!');
});


gulp.task('js', function () {
    gulp.src(['web-app/src/js/**/*js'])
        .pipe(concat('json-query.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('minify-css', function () {
    return gulp.src('web-app/src/css/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(concat('json-query.css'))
        .pipe(gulp.dest('./public/css'));
});


gulp.task('cache-bust', function () {
    return gulp.src('./public/*.html')
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('web', ["js", "minify-css", "cache-bust"], function () {
    gutil.log('Completed  task!');
});