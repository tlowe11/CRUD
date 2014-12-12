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
mongoose.connect('mongodb://localhost:27017/todo-test')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected to mongo");
});



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
  dueDate : Date,
  done: false
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");


// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function(err, todos) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)

      res.send(err);
      res.json(todos); // return all todos in JSON format
			//res.statusCode(302)
    });
  });

  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
      text : req.body.text,
      dueDate: req.body.Date,
      done : false
    }, function(err, todo) {
      if (err)
        res.send(err);
				//res.statusCode(202);
        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
          
          if (err)

            res.send(err);
          });
	    console.log(req.body);
        });

      });

      // delete a todo
      app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
          _id : req.params.todo_id
        }, function(err, todo) {
          if (err)
            res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
              if (err)
                res.send(err)
                res.json(todos);
              });
            });
          });
