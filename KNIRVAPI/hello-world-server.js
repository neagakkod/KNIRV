//var http = require('http');
var UserControllerFile =    require('./UserController');
//console.log(UserController);
var userController= new UserControllerFile.UserController();
//t.showAll();*/

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var socket = require('socket.io-client')('http://localhost:3000');
var app = express();
socket.on('connect', function(){});

socket.on('event', function(data){console.log("received from client");});
socket.on('disconnect', function(){});


//Add headers
app.use(function (req, res, next) {
   //  Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var sess = {
		  secret: '1234567890QWERTY',
		  cookie: {},
		  resave:true,
		  saveUninitialized:true
		};
if (app.get('env') === 'production') {
	  app.set('trust proxy', 1); // trust first proxy
	  sess.cookie.secure = true ;// serve secure cookies
	}
app.use(session(sess));

var server = app.listen(3001, function () {
	  console.log('Example app listening on port 3001!');
	  //app.close();
	});
var io = require('socket.io').listen(server);


	
app.get('/', function (req, res,next) {
	
  res.send('Hello World!');
});

app.post('/login', function (req, res,next) {	
	console.log(req.body);
	  userController.login(req.body,function(err,response)
			  {
		  		req.session.currentUser = response.requested.user;
		  		res.send(response);
			  });
	});

app.get("/userByUsername/:userName",function(req,res,next){
	userController.findByUserUserName(req.params.userName,function(response){
		res.send(response);
	});
});
app.get("/currentUser",function(req,res)
		{
			
			res.send(req.session);
		});
app.get('/newUser', function (req, res) {

	var newInvestor = userController.getNewInvestor();	
	//console.log(newInvestor);
	  res.send(newInvestor);
	  io.emit("event1","d");
	});
app.get('/allUsers',function(req,res)
		{
		userController.showAll(function(allUsers)
			{
				res.send(allUsers);
			});
			
		});

app.post('/performAddUser', function (req, res) {

	console.log(req.body);
	function sendRespponse(errors,response)
	{
		console.log("response",response);
		res.send(response);
	}

	userController.insertInvestor(req.body,sendRespponse);
	 
	});
