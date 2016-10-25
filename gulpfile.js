var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass   = require('gulp-sass'),
	maps   = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	minifySass = require('gulp-clean-css'),
	del    = require('del'),
	webserver = require('gulp-webserver');
;
;
//Concats the javascripts files into a global.js file, creates sourcemaps and saves them to the js folder
gulp.task('concatScripts',function(){
	return gulp.src(['js/circle/autogrow.js',
			  'js/circle/circle.js'])
	.pipe(maps.init())
	.pipe(concat('global.js'))
	// .pipe(maps.write('./'))
	.pipe(maps.write('./'))
	.pipe(gulp.dest('js'));
});
//Minifies the global.js file produced in the concatScripts task, minifies it, renames it and saves it to 
//dist/scripts
gulp.task('minifyScripts',['concatScripts'],function(){
	return gulp.src('js/global.js')
	.pipe(uglify())
	.pipe(rename('all.min.js'))
	.pipe(gulp.dest('dist/scripts'));
});
//The task that will be run to do all the JAVASCRIPT work
gulp.task('scripts',['minifyScripts']);



//The compileSass task that compiles the Sass in a global.css file, makes the sourcemaps in a global.css.maps
// and saves them in the sass folder 
gulp.task('compileSass',function(){
	return gulp.src('sass/global.scss')
	.pipe(maps.init())
	.pipe(sass())
	.pipe(maps.write('./'))
	.pipe(gulp.dest('sass'));
});
//The minifySass task minifies the global.css file produced from the compileSass task, renames it and saves 
//it to dist/styles
gulp.task('minifySass',['compileSass'],function(){
	return gulp.src('sass/global.css')
	.pipe(minifySass({compatibility: 'ie8'}))
	.pipe(rename('all.min.css'))
	.pipe(gulp.dest('dist/styles'))
});
//the task that will be run to do all the SASS work
gulp.task('styles',['minifySass']);

//The images task that minifies images and saves them in the dist/content folder
gulp.task('images',function(){
	return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
});

//The clean task to remove all files and folders that were created in our gulp build
gulp.task('clean',function(){
	del(['dist','js/global.js*','sass/global.css*']);
});

//The build task properly runs the clean, scripts, styles, and images tasks.
gulp.task('build',['clean','scripts','styles','images']);

//The serve task runs the scripts task first and then creates a server and if any 
//javascript file changes, the server reloads automatically
gulp.task('serve',['scripts'],function(){
	return gulp.src('./')
    .pipe(webserver({
      open:true,
      livereload: {
        enable: true, // need this set to true to enable livereload 
        filter: function(fileName) {
          if (fileName.match(/.js/)) { // exclude all source maps from livereload 
            return true;
          } else {
            return false;
          }
        }
      }
    }));
});


gulp.task('default',['build']);