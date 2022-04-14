var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var houseRouter = require('./routes/house');
var addmodRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');
var house = require("./models/house");



const connectionString =  process.env.MONGO_CON;
console.log(connectionString);
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/house',houseRouter);
app.use('/addmods',addmodRouter);
app.use('/selector',selectorRouter);
app.use('/resource',resourceRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
//Get the default connection 
var db = mongoose.connection; 

// We can seed the collection if needed on server start 
async function recreateDB(){ 
  // Delete everything 
  await house.deleteMany(); 

  let instance1 = new house({house_price:"$50000000", house_area:'1500', house_type:"1bhk"});
  instance1.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("First object saved")
  });
 
  let instance2 = new house({house_price:"$100000000", house_area:'2000', house_type:"2bhk"});
  instance2.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("Second object saved")
  });
 
  let instance3 = new house({house_price:"$150000000", house_area:'2500', house_type:"3bhk"});
  instance3.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("Third object saved")
  });
 
 }

 let reseed = true;
 if (reseed) { recreateDB();}
 
//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){ 
console.log("Connection to DB succeeded")}); 

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){console.log("Connection to DB succeeded")});

