const gulp = require('gulp');
const { src, parallel, dest, series } = require('gulp');
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


function jsDeps(done) {
	// An array of dependencies. Use minified versions
	// here since we aren't processing these files.
	const files = [ 
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/lodash/lodash.min.js'
	]

	return src(files)
			.pipe(plumber())
			// Combine these files into a single main.deps.js file
			.pipe(concat('main.deps.js'))
			//Save the concatenated file to the tmp directory
			.pipe(dest('./tmp'))
}





function jsBuild (done) {
	return src('./src/js/*.js')
			.pipe(plumber())
			.pipe(concat('main.build.js'))
			.pipe(babel({
				presets: [
					['@babel/env', {
						modules: false
					}]
				]
			}))
			// And the destination change
			.pipe(dest('./tmp'))
}


function jsConcat(done) {
	const files = [
		'./tmp/main.deps.js',
		'./tmp/main.build.js'
	]
	return src(files) 
			.pipe(plumber())
			// Concatenate the third-party libraries and our
    // homegrown components into a single main.js file.
    		.pipe(concat('main.js'))
    		 // Save it to the final destination.
    	.pipe(dest('./dist/js'))
	
}

exports.default = series(jsDeps, jsBuild, jsConcat)





// Make use of Gulp's 'series' command to ensure each task 
// completes before the next one is run;

//exports.default = series(jsDeps, jsBuild, jsConcat);




/*exports.default = function(done) {
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
}*/

/*
	Tip: We're using the tmp directory as a 
	temporary place to store files during the
	 build process. You can ignore this directory 
	 (add tmp to .gitignore) so you don't have to
	  track changes to these files as they are only
	   useful 
	for a short time during the build process.
*/


/*
series() is a function of Gulp's 
that ensures an array of tasks are run 
in series, meaning that one task may not
 start until the previous one has finished. 
 This is useful in cases like this where we 
 want to ensure we have both temporary files
  (main.deps.js and main.build.js) prior to 
  attempting 
to concatenate them into a single file.
*/
