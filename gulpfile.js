//It will go to the node package and it will import the gulp node package
var gulp = require('gulp');

//we create a task which will run every time we are running gulp
gulp.task('default', function() {
	console.log('Hello World');
}); 
