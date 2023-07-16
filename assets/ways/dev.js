const { src, dest } = require('gulp');
const plugins = require('../plugins.js');
const paths = require('../paths.js');
const utils = require('../utils.js');



// Функции для разработки (папка src)
const dev = {
  // === Работа с препроцессорами ===
  pugToHtml: function() {
    return src(paths.files.dev.pug)
      .pipe(plugins.plumber( utils.errorHandler('PUG') ))
      .pipe(plugins.pug({
        pretty: true
      }))
      .pipe(dest(paths.folders.dev.html))
      .pipe(plugins.browserSync.stream());
  },

  scssToCss: function() {
    return src(paths.files.dev.scssMain, { sourcemaps: true })
      .pipe(plugins.plumber( utils.errorHandler('SCSS') ))
      .pipe(plugins.scss({
        outputStyle: 'expanded'
      }))
      .pipe(plugins.autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
      .pipe(plugins.rename({
        extname: '.min.css'
      }))
      .pipe(dest(paths.folders.dev.css))
      .pipe(plugins.browserSync.stream());
  },

  // === Работа с картинками ===
  imagesToWebp: function() {
    return src(paths.files.dev.images)
      .pipe(plugins.plumber( utils.errorHandler('IMAGES TO WEBP') ))
      .pipe(plugins.webp())
      .pipe(dest(paths.folders.dev.images))
      .pipe(plugins.browserSync.stream());
  },

  imagesToMin: function() {
    return src(paths.files.dev.images)
      .pipe(plugins.plumber( utils.errorHandler('IMAGES TO MIN') ))
      .pipe(plugins.imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3 // 0 to 7
      }))
      .pipe(dest(paths.folders.dev.images))
      .pipe(plugins.browserSync.stream());
  },

  // Работа с браузером (инициализация)
  initBrowser: function() {
    plugins.browserSync.init({
      server: {
          baseDir: "./src"
      }
    });
  }
};

module.exports = dev;
