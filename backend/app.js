const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');

const corsOption = {
  origin : 'http://localhost:3000',
  credentials : true,
  optionSuccessStatus : 200
}
const productsRouter = require('./routes/products');
const variantsRouter = require('./routes/variants');
const filterRouter = require('./routes/filter')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(cors())
app.use(express.json({limit : '100mb'}));
app.use(express.urlencoded({ extended: false, limit : '100mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(mysql);
// app.use(dotenv);

app.use('/filter', filterRouter);
app.use('/products', productsRouter);
app.use('/variants', variantsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
