var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

gulp.task('concatScripts',function(){
	return gulp.src(['js/circle/autogrow.js',
			  'js/circle/circle.js'])
	.pipe(concat('global.js'))
	.pipe(gulp.dest('js'));
});
gulp.task('minifyScripts',['concatScripts'],function(){
	return gulp.src('js/global.js')
	.pipe(uglify())
	.pipe(rename('all.min.js'))
	.pipe(gulp.dest('dist/scripts'));
});





gulp.task('default',function(){

});