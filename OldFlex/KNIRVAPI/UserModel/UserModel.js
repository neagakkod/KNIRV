/**
 * http://usejsdoc.org/
 */
var knirvDbFile  =  require("../KnirvUtils/KnirvDB");
var Promise = require('promise');
var UserDomainsObjectFile = require("./UserDomains");
function UserModel(crypto)
{
	var self = this;
	//private variables;
	var knrivDB = new knirvDbFile.KnirvDB();
	
	self.createNewInvesotr = function(){
		var user = new UserDomainsObjectFile.Investor();	
		return user;
	};
	
	 self.update = function (user)
	 {
		 return new Promise(function(accept,reject)
						 {
							 var updateTransaction = function(err,db)
							 {
								 try
								 {
									 if(err)
									 {
										 reject(err);
										 return;
									 }
									var userCollection = db.collection('Users');
									
									userCollection.update({id:user.id},{$set:user},function(err,transactionReport){
										if(err)
										{
											reject(err);
											return;
										}
										accept(transactionReport);
															
							 			});	
								 }
								 catch(error)
								 {
									 reject(error);
								 }
															 				 
							 };
		
							 knrivDB.executeTransaction(updateTransaction);	
						 }); 
		 
		
	 };
	 self.findByUserName = function (userName,transactionCallBack)
	 {	
		 var findUserTransaction = function(err,db)
		 {
			 var query = {"userName":userName};
			 var userCollection = db.collection('Users');
			 var cursor = userCollection.find(query);
			 cursor.toArray(function (error,searchResult)
					  {	
				 		transactionCallBack(error,searchResult);
				 	 	db.close();
					  });		 
		 };
		 knrivDB.executeTransaction(findUserTransaction);
	 }; 
	 self.findById = function (user_id,transactionCallBack)
	 {	
		 var findUserTransaction = function(err,db)
		 {
			 var query = {"id":user_id};
			 var userCollection = db.collection('Users');
			 var cursor = userCollection.find(query);
			 cursor.toArray(function (error,searchResult)
					  {	
				 		transactionCallBack(error,searchResult);
				 	 	db.close();
					  });		 
		 };
		 knrivDB.executeTransaction(findUserTransaction);
	 };
	 
	 self.findAll = function (transactionCallBack)
	 {
		 var getAllTransaction =  function(err, db) {
			
			 var userCollection = db.collection('Users');
			 var cursor = userCollection.find({});
			 cursor.toArray(function (err,docs)
					  {	
				 		transactionCallBack(err,docs);
				 	 	db.close();
					  });		 
		 };
		 knrivDB.executeTransaction(getAllTransaction);
	 };	
	
	 self.userExistenseCheck = function(user,doWhenDone)
	 {		
		 var userExistenceReport = {userName:{value:user.userName,count:0},email:{value:user.email,count:0}};
		 knrivDB.executeTransaction(function(err,db){
			 
			 var userCollection = db.collection('Users');
			
			 //checking email first
			 var cursor = userCollection.find({email:user.email});
			 
			 cursor.count(function(err,emailCount)
					 {
				
				            userExistenceReport.email.count+=emailCount;
				 			
				 			//checking user name
							cursor = userCollection.find({userName:user.userName});
							
							cursor.count(function(err,userNameCount)
										{
									
											userExistenceReport.userName.count+=userNameCount;
											doWhenDone(err,userExistenceReport);
											db.close();
										});				
			 				
					 });
		 });
	 };
	 self.insertInvestor= function(newUser,saltObject,doWhenDone)
	{
		
		 var insertTransaction  = function(err,db)
								 {
									 try
									 {
										 var userCollection = db.collection('Users');
									
								 		 var addingUserWhenMaxIdObtained = function(maxId)
										 {
							 				
							 				newUser.id = maxId+1;
							 				newUser.permissions= "Investor";
							 				newUser.memberSince = new Date();
							 				userCollection.insert(newUser,function(err, count)
								 			{
							 					doWhenDone(err,count);
								 				db.close();
								 			});	 				
								 		 };	
										 knrivDB.getMaxID(userCollection,addingUserWhenMaxIdObtained);	 
									 }
									 catch(e)
									 {
										 console.log("gateway:There is a problem here");
										 console.log(e);
										 doWhenDone(e);			
									 }	 						
								 };
		 var recordUSerWithGivenPassword = function (err,givenPassword)
		 {
			 newUser.password = givenPassword;
			 knrivDB.executeTransaction(insertTransaction);
		 };
		
		 //encrypting password and inserting user
		 crypto.pbkdf2(newUser.password,saltObject.value,10000,512,recordUSerWithGivenPassword);		 		 
	 };
	
}

exports.UserModel= UserModel;