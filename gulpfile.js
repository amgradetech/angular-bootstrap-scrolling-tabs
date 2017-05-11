const gulp = require('gulp');

const argv = require('yargs').argv;
const autoprefixer = require('gulp-if');
const babel = require('gulp-babel');
const cssnano = require('gulp-cssnano');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

console.log(argv.dev ? 'DEV' : 'Prepublish');

gulp.task('lint', () => gulp
  .src('./src/scrolling-tabs.js')
  .pipe(eslint())
  .pipe(eslint.formatEach())
  .pipe(eslint.failAfterError())
);

gulp.task('js'/*, ['lint']*/, () => gulp
  .src('./src/scrolling-tabs.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulpif(!argv.dev, uglify()))
  .pipe(gulp.dest('dist/'))
);

gulp.task('css', () => gulp
  .src('./src/scrolling-tabs.scss')
  .pipe(sass())
  .pipe(cssnano())
  .pipe(gulp.dest('dist/'))
);

gulp.task('default', ['css', 'js']);
