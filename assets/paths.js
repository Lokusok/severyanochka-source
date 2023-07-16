const paths = {
  files: {
    dev: {
      pug: './src/*.pug',
      html: './src/*.html',
      scss: './src/scss/**/*.scss',
      css: './src/css/**/*.css',
      js: './src/js/**/*.js',
      images: './src/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}',
      fonts: './src/fonts/**/*.{eot,ttf,otf,woff,woff2}',

      scssMain: './src/scss/style.scss',
      jsMain: './src/js/main.js'
    },

    build: {
      jsBabelifyPath: './dist/js/main.js',
      jsMain: 'main.min.js',
    }
  },

  folders: {
    dev: {
      html: './src',
      css: './src/css',
      js: './src/js',
      images: './src/images'
    },

    build: {
      html: './dist',
      css: './dist/css',
      js: './dist/js',
      images: './dist/images',
      fonts: './dist/fonts'
    }
  }
};

module.exports = paths;
