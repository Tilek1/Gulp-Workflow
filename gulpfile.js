const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

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

gulp.task( 'default', ['copyHtml', 'sass', 'concat'])