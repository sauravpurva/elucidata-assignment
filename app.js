var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getQuizRouter = require('./routes/getQuiz');
var postQuizRouter = require('./routes/postQuiz');
var postQuestionRouter = require('./routes/postQuestion');
var getQuestionRouter = require('./routes/getQuestion');
var getAllQuestionsRouter = require('./routes/getAllQuestions');

var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var db = require("./database")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/', usersRouter);
app.use('/api/quiz/:quiz_id', function(req, res, next) {
	req.db = db;
	next();	
}, getQuizRouter);

app.use('/api/quiz/', function(req, res, next) {
	req.db = db;
	next();	
}, postQuizRouter);

app.use('/api/questions/', function(req, res, next) {
	req.db = db;
	next();	
}, postQuestionRouter);

app.use('/api/questions/:question_id', function(req, res, next) {
	req.db = db;
	next();	
}, getQuestionRouter);

app.use('/api/quiz-questions/:quiz_id', function(req, res, next) {
	req.db = db;
	next();	
}, getAllQuestionsRouter);

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
