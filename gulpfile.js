const { series, parallel } = require('gulp');
const { general } = require('./assets/general.js');
const devWay = require('./assets/ways/dev.js');
const buildWay = require('./assets/ways/build.js');


// === Отдельные переводы препроцессоров в чистые форматы ===
module.exports.pugDev = devWay.pugToHtml;
module.exports.scssDev = devWay.scssToCss;

// === Перевод всех препроцессоров в чистый формат ===
const preprosAll = series(devWay.pugToHtml, devWay.scssToCss);
module.exports.preprosAll = preprosAll;

// === Манипуляции с картинками ===
const fullImages = series(devWay.imagesToMin, devWay.imagesToWebp);
module.exports.fullImages = fullImages;

// Отдельные настройки изображений
module.exports.imgmin = devWay.imagesToMin; 
module.exports.imgwebp = devWay.imagesToWebp;

// === Сборка всех JS-файлов ===
const buildJs = series(buildWay.babelifyJsMain, buildWay.uniteJsAll);
module.exports.buildJs = buildJs;

// === Перенос файлов на продакшн ===
// Перенос CSS - файлов
const moveCss = buildWay.moveCss;
module.exports.moveCss = moveCss;

// Перенос основных типов файлов
const moveFiles = series(buildWay.deleteBuildFolder, (process.argv.includes('--min-pug') ? buildWay.minifyAndMoveHtml : buildWay.moveHtml), moveCss, buildWay.moveImages, buildWay.moveFonts, buildJs);
module.exports.moveFiles = moveFiles;

// === Режим разработки ===
const startDev = parallel(general.startWatch, devWay.initBrowser);
module.exports.dev = startDev;

// === Режим для продакшна ===
const startBuild = series(preprosAll, fullImages, buildJs, moveFiles);
module.exports.build = startBuild;
