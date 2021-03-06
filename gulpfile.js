var gulp = require('gulp');

var connect = require('gulp-connect');

var stream = require('event-stream');

var concat = require('gulp-concat');

var less = require('gulp-less');

var uglify = require('gulp-uglify');

var minifyCss = require('gulp-minify-css');

var minifyHtml = require('gulp-minify-html');


var templateCache = require('gulp-angular-templatecache');

//https://www.npmjs.com/package/gulp-rename
var rename = require('gulp-rename');

//npm install --save-dev gulp-jshint
var jshint = require('gulp-jshint');
//npm install --save-dev jshint-stylish


var path = {
    js: ['src/app/**/*.js','!src/app/**/*.route.js','!src/app/route.js'],
    less: ['src/assets/**/*.less'],
    css: ['src/assets/**/*.css'],
    html: ['src/**/*.html'],
    route: ['src/app/**/*.route.js']
};

gulp.task('js', function () {

    gulp.src(path.js,{base:'src'})
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

});

gulp.task('html', function(){

    gulp.src(path.html,{base:'src'})
        .pipe(minifyHtml({ quotes: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {

});

gulp.task('assets', function () {
    gulp.src(['src/assets/**/*.*', '!src/assets/**/*.less'], { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', function () {
    //api.test
    gulp.src(['src/api.test/**/*.*'], { base: 'src' })
        .pipe(gulp.dest('dist'));

    //route
    gulp.src('src/app/route.js', { base: 'src' })
        .pipe(gulp.dest('dist/'));

    //breadcrumb
    gulp.src('src/app/bread/bread.json', { base: 'src' })
        .pipe(gulp.dest('dist/'));
});

gulp.task('jshint', function () {

    gulp.src(path.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('route', function() {

    gulp.src(path.route)
        .pipe(concat('route.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/app/'));
});

gulp.task('less', function () {

    gulp.src(['src/assets/theme/*/less/bootstrap.less','src/assets/theme/*/less/style.less'])
        .pipe(less())
        .pipe(minifyCss())
        .pipe(rename(function(path){
            path.dirname = path.dirname.replace('less','css');
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('src/assets/theme/'));

});



gulp.task('watch', function () {
    gulp.watch(path.less, ['less']);
    gulp.watch(path.route, ['route']);
});

gulp.task('connect-dev', function() {
    connect.server({
        root: 'src',
        port: 8010
    });
});

gulp.task('connect-dist', function() {
    connect.server({
        root: 'dist',
        port: 8090
    });
});

gulp.task('default', ['watch', 'connect-dev']);

gulp.task('build', ['less', 'html', 'css', 'js', 'assets', 'copy', 'connect-dist']);