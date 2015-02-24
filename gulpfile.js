// It will import the node packages
// and it will assign each one in a variable
var gulp = require('gulp'),
	uglify = require('gulp-uglify');


// Scripts Tasks
// Uglifies
gulp.task('scripts', function(){
	gulp.src('application/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'));
});

// Styles Tasks
// Uglifies
gulp.task('styles', function(){
	console.log('run styles')
});



gulp.task('default', ['scripts', 'styles']); 
