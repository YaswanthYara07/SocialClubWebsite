var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Added
var session = require('express-session');
var mysql=require('mysql');
var bodyParser = require('body-parser');
var dbConnectionPool=mysql.createPool({
    host: 'localhost',
    database: 'wbcProject'
});

var app = express();
// Added
app.use(function(req,res,next){
    req.pool=dbConnectionPool;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "a string of your choice",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
    }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);



app.get('/search_user', (request, response) => {
    const query = request.query.q;
    var sql = '';
      sql = `SELECT user_id, username, first_name, last_name, email FROM user WHERE username LIKE '${query}%' OR first_name LIKE '${query}%' OR last_name LIKE '${query}%' OR email LIKE '${query}%' OR user_id LIKE '${query}%' ORDER BY username LIMIT 1`;
    dbConnectionPool.query(sql, (error, results) => {
      if (error) throw error;
      response.send(results);
    });
  });

  app.get('/search_post', (request, response) => {
    const query = request.query.q;
    var sql = '';
    sql = `SELECT post_name, post_id, post_content FROM post WHERE post_name LIKE '${query}%' OR post_id LIKE '${query}%' OR post_content LIKE '${query}%' LIMIT 1`;
    dbConnectionPool.query(sql, (error, results) => {
      if (error) throw error;
      response.send(results);
    });
  });

  app.get('/search_club', (request, response) => {
    const query = request.query.q;
    var sql = '';
    sql = `SELECT club_name, club_description, club_id FROM club WHERE club_name LIKE '${query}%' OR club_id LIKE '${query}%' OR club_description LIKE '${query}%' LIMIT 1`;
    dbConnectionPool.query(sql, (error, results) => {
      if (error) throw error;
      response.send(results);
    });
  });
module.exports = app;
