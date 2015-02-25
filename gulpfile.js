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
	notify = require('gulp-notify');





// Scripts Tasks
// Uglifies the js files
gulp.task('scripts', function(){
	gulp.src('application/js/*.js')
		.pipe(uglify())
		.on('error', function(err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest('build/js'))
		.pipe(livereload());
});

// Styles Tasks
// 
gulp.task('styles', function(){
	return sass('application/scss/', { 
		style: 'compressed' 
	})
	.on('error', function(err) {
		console.error('Error!', err.message);
	})
	.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
	.pipe(gulp.dest('application/css/'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(notify({ message: 'Styles task complete' }))
	.pipe(livereload());
});

// JSHint 
// 
gulp.task('lint', function() {
  return gulp.src('application/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


// Connect 
//
gulp.task('webserver', function(){
	connect.server({
		root: 'application',
		livereload: true
	});
})

// Image Task
// Compress
gulp.task('image', function(){
	gulp.src(['application/images/**/*'])
    .pipe(cache(imagemin({
    	progressive: true,
     	interlaced: true
    })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'Images task complete' }));
});


// Watch Tasks
// Watches js files
gulp.task('watch', function(){
	var server = livereload();
	gulp.watch('application/scss/*', ['styles']);
	gulp.watch('application/index.html', ['styles', 'scripts']);
	gulp.watch('application/**/*.js', ['scripts']);
});

gulp.task('default', ['webserver', 'scripts', 'styles', 'watch']); 
