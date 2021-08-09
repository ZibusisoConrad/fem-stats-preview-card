// initialize modules 
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Use dart-sass for use 
// sass.complier = require('dart-sass');

// Sass task
function scssTask(){
  return src('app/scss/style.scss', {sourcemaps: true})
  .pipe(sass())
  .pipe(postcss([autoprefixer()])) // , cssnano()  add this later
  .pipe(dest('dist', {sourcemap: '.'}));
}

// Javascript Task
// function jsTask(){
//   return src ('app/js/script.js', {sourcemap: true})
//   .pipe(babel({presets: ['@babel/preset-env']}))
//   .pipe(terser())
//   .pipe(dest('dist', {sourcemaps: '.'}));
// }

// Browsersync 
function browserSyncServe(cb){
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}

 function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task 
function watchTask(){
  watch('*.html', browserSyncReload);
  watch(
    ['app/scss/**/*.scss'], 
    series(scssTask, browserSyncReload)
  );
}

// Defualt Gulp Task
exports.default = series(scssTask, browserSyncServe, watchTask);