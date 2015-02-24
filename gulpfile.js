// It will import the node packages
// and it will assign each one in a variable
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-ruby-sass');

// Scripts Tasks
// Uglifies the js files
gulp.task('scripts', function(){
	gulp.src('application/js/*.js')
		.pipe(uglify())
		.on('error', function(err) {
			console.error('Error!', err.message);
		})
		.pipe(gulp.dest('build/js'));
});

// Styles Tasks
// 
gulp.task('styles', function(){
	return sass('./application/scss/', { style: 'compressed' })
	.on('error', function(err) {
		console.error('Error!', err.message);
	})
	.pipe(gulp.dest('css/'))
});

// Watch Tasks
// Watches js files
gulp.task('watch', function(){
	gulp.watch('scss/*', ['styles']);
	gulp.watch('application/**/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'styles', 'watch']); 
