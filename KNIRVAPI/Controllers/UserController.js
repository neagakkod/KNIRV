/**
 * http://usejsdoc.org/
 */

function UserController()
{
	var self = this;
	//importing utilities files
	var SaltModelFile = require("../UserModel/SaltModel");
	var UserModelFile = require("../UserModel/UserModel");	
	var KnirvPostFile = require("../KnirvUtils/KnirvPost");
	var KnirvRequestResponseFile =  require("../KnirvUtils/KnirvRequestResponse");
	
	//starting utilites
	var Promise = require('promise');
	var crypto = require('crypto');
	var saltModel =  new SaltModelFile.SaltModel(crypto);
	var userModel =  new UserModelFile.UserModel(crypto);
	
	var processCaughtError = function(caughtError,sendResponse)
	{
		var  response =  new KnirvRequestResponseFile.KnirvErrorRequestResponse(caughtError);	
			response.message = caughtError.message;			
			sendResponse(response);
	};
	
	/**
	 * showAll(doWhenFound):function returns to doWhenFound callback 
	 **/
	 
	self.showAll = function(sendResponse)
	{
		var response;
		var transactionCallBack = function(errors,searchResult)
		{
			try{
				response = new KnirvRequestResponseFile.KnirvObjectRequestResponse(searchResult);
				sendResponse(response);
			}
			catch(caughtError)
			{
				response =  new KnirvRequestResponseFile.KnirvErrorRequestResponse(caughtError);
				response.message = caughtError.message;		
				sendResponse(response);
			}
		};
		try
		{			
			userModel.findAll(transactionCallBack);		
		}
		catch(err)
		{
			processCaughtError(err,sendResponse);
		}
	};

	self.login = function (userCredentials)//,sendResponse)
	{
		var authetication = new Promise(function(resolve,reject){
			
			 console.log("userCredentials",userCredentials);
				var passwordToValidate = userCredentials.password;
			
				
				 userModel.findByUserName(userCredentials.userName,function testerCallb(errors,searchResult)
					{
					  
					 	
					 
					 try
						{
						   if(searchResult.length === 0)
							{
							   throw new Error( "login error:user with username:"+userCredentials.userName+ "is not found");}
							   
						   	   var user = searchResult[0];
							   
						   		saltModel.getSaltByUser(user.id,function(errors,rslt)
									   {	
								   				var saltObject = rslt[0];
								   			   crypto.pbkdf2(passwordToValidate,saltObject.value,10000,512,function(err,hashedResultToValidate)
								   			    {
									   				var credentialsAreGood= hashedResultToValidate.toString() === user.password.buffer.toString();
									   				delete user.password;
									   				delete user._id;
									   				var response = new KnirvRequestResponseFile.KnirvObjectRequestResponse({athenticationPass:credentialsAreGood,user:credentialsAreGood?user:null});
									   				resolve(response);
									   				reject(errors);
									   			//	sendResponse(errors,response); 
								   			    });	
								   
									   });
						}
						catch(caughtError)
						{
							processCaughtError(caughtError,reject);
						}
					});
		});
		
		
	
		return authetication;
		  
	};
	
	self.findByUserUserName = function(username,sendResponse)
	{
		var response;
		userModel.findByUserName(username,function(errors,searchResult){
			try{
				 response =  new KnirvRequestResponseFile.KnirvObjectRequestResponse(searchResult);
				 sendResponse(response);		
			}
			catch(caughtError)
			{
				processCaughtError(caughtError,sendResponse);
			}
			
		});
	};

	self.insertInvestor = function(newInvestor,sendResponse)
	{
		var promise = new Promise(function(accept,reject)
		{
			var response;
			try{
				var saltObject =  saltModel.createNewSalt();
					
				 var insertSaltTransactionCallBack = function (errors,transactionReport)
				 {
					var transactionWentWell = transactionReport.result.ok === 1;
					if(transactionWentWell)
					{
						response =  new KnirvRequestResponseFile.KnirvObjectRequestResponse({});
						accept(response);						
					}
				 };
				var insertUserTransactionCallBack=  function (errors,transactionReport)
				{
					 try
					 {				
						var transactionWentWell = transactionReport.result.ok === 1;
						if (transactionWentWell)
						{
							var itemInserted = transactionReport.ops[0];
							saltObject.user_id = itemInserted.id;
							saltModel.insert(saltObject,insertSaltTransactionCallBack);
						}
					 }
					 catch(caughtError)
					 {
						 processCaughtError(caughtError,reject);
					
					 }
				};
				 	
				 userModel.userExistenseCheck(newInvestor,function(err,userExistenceReport){
					 try{
						 
						 if(userExistenceReport.userName.count>0)
							{throw new Error("Username "+userExistenceReport.userName.value +" already exists in our records");}
						if(userExistenceReport.email.count>0)
							{throw new Error("Email "+userExistenceReport.email.value +" already exists in our records");}

						userModel.insertInvestor(newInvestor,saltObject,insertUserTransactionCallBack);	
					 }catch(caughtError)
					 {
						 
						 processCaughtError(caughtError,reject);
					 }
					
								 
				 });
				
		
		
		}
		catch(caughtError)
		{
			processCaughtError(caughtError,reject);

		}});
		return promise;
	};	

}

exports.UserController = UserController; 