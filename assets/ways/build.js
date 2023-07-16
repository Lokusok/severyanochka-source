const { src, dest } = require('gulp');
const plugins = require('../plugins.js');
const paths = require('../paths.js');
const utils = require('../utils.js');


// Функции для переноса в продакшн (папка dist)
const build = {
  // === Работа с JS ===
  // Прогонка через Babel основной файл main.js
  babelifyJsMain: function() {
    return src(paths.files.dev.jsMain)
      .pipe(plugins.plumber( utils.errorHandler('BABELIFY MAIN JS') ))
      .pipe(plugins.babel({
        presets: ['@babel/env']
      }))
      .pipe(dest(paths.folders.build.js))
  },

  // Объединение всех JS-файлов
  uniteJsAll: function() {
    return src([paths.files.dev.js, `!${paths.files.dev.jsMain}`])
      .pipe(plugins.plumber( utils.errorHandler('UNITE ALL JS') ))
      .pipe(plugins.concat(paths.files.build.jsMain))
      .pipe(plugins.appendPrepend.appendFile(paths.files.build.jsBabelifyPath))
      .pipe(dest(paths.folders.build.js))
  },

  // === Работа с HTML (PUG), минификация итогового html-файла ===
  minifyAndMoveHtml: function() {
    return src(paths.files.dev.pug)
      .pipe(plugins.plumber( utils.errorHandler('MINIFY HTML FROM PUG') ))
      .pipe(plugins.pug())
      .pipe(dest(paths.folders.build.html))
  },

  // === Удаление папки с продакшном ===
  deleteBuildFolder: function() {
    return plugins.del(paths.folders.build.html);
  },

  // === Перенос всех файлов с папки src в папку dist ===
  moveHtml: function() {
    return src(paths.files.dev.html)
      .pipe(plugins.plumber( utils.errorHandler('MOVE HTML') ))
      .pipe(dest(paths.folders.build.html))
  },

  moveCss: function() {
    return src(paths.files.dev.css)
      .pipe(plugins.plumber( utils.errorHandler('MOVE CSS') ))
      .pipe(plugins.cssnano())
      .pipe(dest(paths.folders.build.css))
  },

  moveImages: function() {
    return src(paths.files.dev.images)
      .pipe(plugins.plumber( utils.errorHandler('MOVE IMAGES') ))
      .pipe(dest(paths.folders.build.images))
  },

  moveFonts: function() {
    return src(paths.files.dev.fonts)
      .pipe(plugins.plumber( utils.errorHandler('MOVE FONTS') ))
      .pipe(dest(paths.folders.build.fonts))
  }
};

module.exports = build;
