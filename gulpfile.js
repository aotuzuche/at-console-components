/* eslint-disable @typescript-eslint/no-var-requires */
let gulp = require('gulp')
let scss = require('gulp-sass')
let px2rem = require('gulp-px2rem')
let rename = require('gulp-rename')
let renameScssRequire = require('./scripts/gulp-rename-scss.js')

const px2remOptions = {
  rootValue: 100,
  replace: true,
  minPx: 2,
}

const postCssOptions = {
  map: true,
}

gulp.task('compileScssToLib', function() {
  return gulp
    .src('./components/**/*.scss')
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(px2rem(px2remOptions, postCssOptions))
    .pipe(gulp.dest('lib'))
})

gulp.task('compileScssToES', function() {
  return gulp
    .src('./components/**/*.scss')
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(px2rem(px2remOptions, postCssOptions))
    .pipe(gulp.dest('es'))
})

gulp.task('renameIndexToESCss', function() {
  return gulp
    .src('./es/**/style/index.js')
    .pipe(
      rename(function(path) {
        path.basename = 'css'
      }),
    )
    .pipe(gulp.dest('es/'))
})

gulp.task('renameIndexibLIbCss', function() {
  return gulp
    .src('./lib/**/style/index.js')
    .pipe(
      rename(function(path) {
        path.basename = 'css'
      }),
    )
    .pipe(gulp.dest('lib/'))
})

gulp.task('renameCssRquireToES', function() {
  return gulp
    .src(['es/**/style/css.js'])
    .pipe(renameScssRequire())
    .pipe(gulp.dest('es/'))
})
gulp.task('renameCssRquireToLib', function() {
  return gulp
    .src(['lib/**/style/css.js'])
    .pipe(renameScssRequire())
    .pipe(gulp.dest('lib/'))
})
gulp.task(
  'default',
  gulp.series(
    gulp.parallel(
      'compileScssToLib',
      'compileScssToES',
      'renameIndexToESCss',
      'renameIndexibLIbCss',
    ),
    gulp.parallel('renameCssRquireToES', 'renameCssRquireToLib'),
  ),
)
