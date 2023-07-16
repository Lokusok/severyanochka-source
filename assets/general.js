const { watch } = require('gulp');
const dev = require('./ways/dev.js');
const paths = require('./paths.js');
const plugins = require('./plugins');


// Общие настройки для работы всей сборки
const general = {
  startWatch: function() {
    // Переход из препроцессоров в чистый формат при внесении изменений в файлы
    watch('./src/**/*.pug', dev.pugToHtml);
    watch(paths.files.dev.scss, dev.scssToCss);
    watch(paths.files.dev.js, plugins.browserSync.reload);
  }
};

module.exports.general = general;
