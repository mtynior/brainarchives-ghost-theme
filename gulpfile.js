var gulp             = require('gulp'),
    sass             = require('gulp-sass'),
    autoprefixer     = require('gulp-autoprefixer'),
    sourcemaps       = require('gulp-sourcemaps'),
    minifyCss        = require('gulp-clean-css'),
    rename           = require('gulp-rename'),
    gulpSequence     = require('gulp-sequence');


gulp.task('sass', function(){
    // sass directory
    return gulp.src('./src/sass/**/*scss')
            .pipe(sass())
            //outputstyle (nested, compact, expanded, compressed)
            .pipe(sass({outputStyle:'compact'}).on('error', sass.logError))
            // sourcemaps
            .pipe(sourcemaps.init())
            // sourcemaps output directory
            .pipe(sourcemaps.write(('./maps')))
            // css output directory
            .pipe(gulp.dest('./assets/css'));
});

gulp.task('minify-css', function(){
   return gulp.src('./assets/css/brainarchives.css')
            .pipe(minifyCss())
             // autoprefixer
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            // minify css rename
            .pipe(rename('brainarchives.min.css'))
            // minify css output directory
            .pipe(gulp.dest('./assets/css/'));
});

gulp.task('build_styles', function(callback) {
    gulpSequence('sass', 'minify-css')(callback)
});
  
gulp.task('watch_styles', function(){
    gulp.watch('./src/sass/**/*.scss', ['build_styles']);
});

gulp.task('default', ['watch_styles']);
