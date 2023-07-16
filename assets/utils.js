const plugins = require('./plugins.js');


// Для вставки в gulp-plumber
const errorHandler = title => plugins.notify.onError({
  title: title,
  message: 'Error: <%= error.message %>'
});


module.exports = { 
  errorHandler
};
