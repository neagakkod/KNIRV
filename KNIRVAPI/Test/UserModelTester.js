/**
 * http://usejsdoc.org/
 */
var UserModelFile = require("../UserModel/UserModel");
var SaltModelFile = require("../UserModel/SaltModel");
var Promise = require('promise');
function UserModelTester()
{   var crypto = require('crypto');
	var userModel  = new UserModelFile.UserModel(crypto);
	
	this.testCreateNewInvestor = function()
	{
		var result = userModel.createNewInvesotr();
		console.log(result);
		return result;
	};
	
	this.testFindAll = function()
	{
		userModel.findAll(function(errors,searchResult){
			console.log(errors);
			console.log(searchResult);
			
		});
		
	};
	
	this.testInsert = function (newUser)
	{
		var saltModel = new  SaltModelFile.SaltModel(crypto); 
		var saltObject =  saltModel.createNewSalt();
		 function insertSaltTransactionCallBack(errors,transactionReport)
		 {
			 console.log("errors:",errors);
			console.log("transactionReport report:",transactionReport);
		 }
		 function insertUserTransactionCallBack(errors,transactionReport)
			{
				console.log("errors:",errors);
				console.log("transactionReport report:",transactionReport);
				var transactionWentWell =!errors && transactionReport.result.ok === 1;
				if (transactionWentWell)
				{
					console.log("saving salt ...");
					var itemInserted = transactionReport.ops[0];
					saltObject.user_id = itemInserted.id;
					saltModel.insert(saltObject,insertSaltTransactionCallBack);
				}
			}
		userModel.insertInvestor(newUser,saltObject,insertUserTransactionCallBack);
	};
	
	this.testfindUserById = function (id,doWhenFound)
	{

		var testerCallb= function (errors,searchResult)
		{
			console.log("errors:",errors);
			console.log("searchResult report:",searchResult);
		};
		if(doWhenFound)
		{
			testerCallb=doWhenFound;
		}
		userModel.findById(id,testerCallb);
	};
	
	this.testfindUserByUserName = function (userName)
	{

		function testerCallb(errors,searchResult)
		{
			console.log("errors:",errors);
			console.log("searchResult report:",searchResult);
		}
		userModel.findByUserName(userName,testerCallb);
	};
   this.testAuthenticaticity = function(user_id,passwordToValidate)
   {
	   var saltModel = new  SaltModelFile.SaltModel(crypto); 

	   userModel.findById(user_id,function testerCallb(errors,searchResult)
		{
		   var user = searchResult[0];
		   saltModel.getSaltByUser(user.id,function(errors,rslt)
				   {	
			   				var saltObject = rslt[0];
			   			   crypto.pbkdf2(passwordToValidate,saltObject.value,10000,512,function(err,hashedResultToValidate){
			   				   console.log(hashedResultToValidate.toString());
			   				   console.log(user.password.buffer.toString());
			   				  console.log(hashedResultToValidate.toString() === user.password.buffer.toString());
			   			   });	
			   
				   });
			
		});	   	 	
   };
   this.testUpdate=function(usr)
   {
	   return new Promise (function(accept,reject){
		   
		  
			   			return userModel.update(usr).then(accept,reject);
				  
		 
	   });
   };
   this.testUserExistence = function(user,doWhenFound)
   {
	   userModel.userExistenseCheck(user,doWhenFound);
   };
}

var tester = new UserModelTester();

/*var newUser = tester.testCreateNewInvestor();
 newUser.userName = "herm";
 newUser.password = "bobo";

tester.testUserExistence(newUser,function(err,userExistenceReport){

	console.log(userExistenceReport);
});*/
 //tester.testInsert(newUser);


 tester.testfindUserById(2,function(errors,usr)
{
	 usr= usr[0];
	usr.userName="lemano";
	usr.email= "lemanod@gmail.com";
	
	tester.testUpdate(usr).then(function(result){
		console.log("in the accept:");
		console.log(result);
		},function(result){
			console.log("in the reject:");
			console.log(result);
		});
});
//tester.testFindAll();
//tester.testAuthenticaticity(71,"12345");
//tester.testfindUserByUserName("herm");
