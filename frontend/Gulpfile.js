/*
 * Only being used to customize Bulma with its sass and then returning
 * the built CSS.
 */

var gulp = require('gulp')
var sass = require('gulp-sass')

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./static/css'))
})

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.sass', ['sass'])
})
