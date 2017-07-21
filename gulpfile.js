var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    server = require('gulp-server-livereload');

//server
gulp.task('start', function() {
  gulp.src('prod')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('prod'));
});

gulp.task('tampl', function () {
    return gulp.src(['app/**/*.html','!app/bower_components/**/*.html','!app/components/**/*.html'])
        .pipe(gulp.dest('prod'));
});
