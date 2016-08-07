/**
 * http://usejsdoc.org/
 */

exports.UserAPIController = function  (app,jwt)
{
	var sekrea= "menSekrea";
	var PayLoadFile = require('./KnirvUtils/KnirvPayLoad'); 
	var UserControllerFile = require('./Controllers/UserController');
	
	//controllers
	var userController = new UserControllerFile.UserController();
	app.post('/login', function (req, res,next) {	
		  console.log(req.body);
		
		  userController.login(req.body).then(function(response)
				  {
	
			  			if(response.requested.athenticationPass)
			  			{
			  				var token = jwt.sign(response.requested.user,sekrea);
			  				response.requested.token = token;
			  				res.send(response);
			  				return;
			  			}
			  			response.message = "Login Failed";
			  			res.send(response);
				  },function(error)
				  {
					  res.send(error);
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
		
		});
	app.get('/allUsers',function(req,res)
			{
				userController.showAll(function(allUsers)
				{
					res.send(allUsers);
				});
				
			});
	app.post('/updateUser',function(req,res)
			{
			
			});
	app.post('/performAddUser', function (req, res) {	
	
		function acceptance(response)
		{
			var payLoad = new PayLoadFile.PayLoad(req);
			console.log("created payload");
			var token = jwt.sign(payLoad,sekrea);
			console.log("token:"+token);
			
			response.requested.token = token;
			console.log(response);
			res.send(response);
		}
		function rejection(response)
		{
			console.log("response",response);
			res.send(response);
		}
	
		userController.insertInvestor(req.body).then(acceptance,rejection);
		 
	});

};