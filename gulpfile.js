// It will import the node packages
// and it will assign each one in a variable
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    jscs = require('gulp-jscs'),
    del = require('del');

// Clean
// Clean out the destination folders
gulp.task('clean', function (cb) {
    del(['build/js/*', 'application/css/*'], cb);
});

// Scripts Tasks
// Uglifies the js files and reloads the webserver
gulp.task('scripts', function () {
    gulp.src(['application/js/*.js'])
        .pipe(uglify())
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('build/js'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

// JSHint 
// It will check the javascripts files for syntax errors
gulp.task('lint', function () {
    gulp.src('application/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }))
});

// JSCS
// It checks the coding style
gulp.task('jscs', function () {
    gulp.src('application/**/*.js')
        .pipe(jscs('.jscsrc'))
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));
});

// Styles Tasks
// It compresses, minify and compile the sass files to css and reloads the webserver
gulp.task('styles', function () {
    return sass('application/scss/', {
            style: 'compressed'
        })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('application/css/'))
        .pipe(minifycss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(livereload())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// Image Task
// It compresses the images 
gulp.task('image', function () {
    gulp.src(['application/images/**/*'])
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('build/images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

// Connect 
// It connects to  a server
gulp.task('webserver', function () {
    connect.server({
        root: 'application',
        livereload: true
    });
})

// Watch Tasks
// Watches js, html and js files files
gulp.task('watch', function () {
    var server = livereload();
    gulp.watch('application/scss/*', ['styles']);
    gulp.watch('application/index.html', ['styles', 'scripts']);
    gulp.watch('application/**/*.js', ['scripts']);
});

// Default task
gulp.task('default', ['clean', 'webserver', 'scripts', 'styles', 'image', 'watch']);