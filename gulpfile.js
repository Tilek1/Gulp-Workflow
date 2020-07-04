const gulp = require('gulp');
const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const babel = require('gulp-babel');
const plumber = require('gulp-plumber');


// TOP LEVEL FUNCTIONS
/*
	gulp.task - Define tasks
	gulp.src - Point to files to use
	gulp.dest - Points to folder to output
	gulp.watch - Watch files and folders or changes 
*/

// Logs Message

gulp.task('message', async function() {
	return console.log('Gulp is running...')
});

// Copy All HTML files 

gulp.task('copyHtml', async function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
})


// Complie Sass files

gulp.task('sass', async function() {
	gulp.src('src/sass/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('dist/css'))
})


gulp.task('concat', async function() {
	gulp.src('src/js/*.js')
	.pipe(concat('main.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
})

// Gulp 4 uses exported objects as its tasks. Here we only have a
// single export that represents the default gulp task.

exports.default = function(done) {
	return src('./src/js/*.js')
			//Stop the process if an error is thrown
			.pipe(plumber())
			.pipe(concat('main.js'))
			//Transpile the JS code using Babel's preset-env
			.pipe(babel({
				presets: [
					['@babel/env', {
						modules: false
					}]
				]
			}))
			.pipe(dest('./dist/js'))
}