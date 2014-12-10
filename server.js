//server code
//set up
var express = require('express');
var app 	= express();
//creates app w/ express
var mongoose = require('mongoose');
//mongoose for mongodb
var morgan = require('morgan');
//log requests to the console (express4)
var bodyParser = require('body-parser');
//pull information from HTML POST (express4)
var methodOverride = require('method-override')
//simulate DELETE and PUT (express4)

//configuration
mongoose.connect('mongodb://localhost:27017/todo')
//connects to mongodb
app.use(express.static(__dirname + '/public'));
//set the static files location
app.use(morgan('dev'));
//log requests to console
app.use(bodyParser.urlencoded({'extended':'true'}));
//parse application/x-www-form-urlencoded
app.use(bodyParser.json());
//parse application/json
app.use(bodyParser.json({type:'application/vnd.api_json'}));
//parse application/vnd.api_json as json
app.use(methodOverride());

//define model
var Todo = mongoose.model('Todo', {
	text : String, 
	dueDate : { type: Date, default: Date.now }
});
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


