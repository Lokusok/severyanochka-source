const pug = require('gulp-pug');
const scss = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const appendPrepend = require('gulp-append-prepend');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');


const browserSync = require('browser-sync').create();

module.exports = {
  pug,
  scss,
  rename,
  plumber,
  notify,
  webp,
  imagemin,
  concat,
  babel,
  appendPrepend,
  del,
  browserSync,
  autoprefixer,
  cssnano,
};
