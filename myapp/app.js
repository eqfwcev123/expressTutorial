var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 특정 경로에 대해서만 app.use 와 HTTP메소드 사용
// 아래같은 경우 /hello 경로에 대해서면 미들웨어를 사용
let myLogger = function(req,res,next){
  console.log('Logged');
  next()
}

app.use('/hello', myLogger);

app.get('/hello', function(req,res){
  res.send('Hello world');
})

app.use('/users/:id', function(req,res,next){
  console.log("Request Type :", req.method)
  next()
})

app.get('/users/:id', function(req,res,next){
  console.log(req.params)
  res.send('user')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// http://localhost:3000/static/stylesheets/style.css
app.use('/static',express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
