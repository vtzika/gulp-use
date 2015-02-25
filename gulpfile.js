// It will import the node packages
// and it will assign each one in a variable
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass');
	connect = require('gulp-connect');
	livereload = require('gulp-livereload');

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
	return sass('application/scss/main.scss', { 
		style: 'compressed' 
	})
	.on('error', function(err) {
		console.error('Error!', err.message);
	})
	.pipe(gulp.dest('application/css/'))
	.pipe(livereload());

});


// Connect 
//
gulp.task('webserver', function(){
	connect.server({
		root: 'application',
		livereload: true
	});
})

// Watch Tasks
// Watches js files
gulp.task('watch', function(){
	var server = livereload();
	gulp.watch('scss/*', ['styles']);
	gulp.watch('application/**/*.js', ['scripts']);
});

gulp.task('default', ['webserver', 'scripts', 'styles', 'watch']); 
