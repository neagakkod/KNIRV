
//IMPORTING packages
var express = require('express');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
//var expressJWT = require('express-jwt');



//starting app
var app = express();

var server = app.listen(3001, function () {
	  console.log('Example app listening on port 3001!');
	  //app.close();
	});

//-------------------- Middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());	
//app.use(expressJWT({secret:"menSekrea"}).unless({path:["/login"]}));

//Add headers
app.use(function (req, res, next) {
   //  Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://192.168.0.104:3002');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, x-access-token,application/x-www-form-urlencoded;charset=UTF-8');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//route middleware to verify a token
app.use(function(req, res, next) {
	if(req.originalUrl.indexOf("login")>0||req.originalUrl.indexOf("performAddUser")>0 )
	{		
		return next();
	}
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get("menSekrea"), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});
//error handling
app.use(function (err, req, res, next) {
    console.error('Error>', err.message);
    return next();
});

//importing API CONTROLLERS 
require('./UserAPIController').UserAPIController(app,jwt);//Users API CONTROLLER




//default
app.get('/', function (req, res,next) {
	
  res.send('Hello World!');
});




