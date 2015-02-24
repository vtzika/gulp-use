// It will import the node packages
// and it will assign each one in a variable
var gulp = require('gulp'),
	uglify = require('gulp-uglify');

// we create a task which will run every time we are running gulp
// it uglifies every js file of the specific directory
// it will save the uglified file in the minjs folder 
gulp.task('default', function() {
	gulp.src('application/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
}); 

gulp.task('')
