/**
 * http://usejsdoc.org/
 */
/*
 * this file is deprecated. 
 * */

var UserDomainsObjectFile = require("./UserDomains");
function AddressCreator(rawAddress)
{
	var self = this;
	self.create = function(rawAddress)
	{
		var newAddress = new UserDomainsObjectFile.Address();
		
		newAddress.streetAddress = rawAddress.streetAddress;
		newAddress.city = rawAddress.city;
		newAddress.country = rawAddress.country;
		newAddress.region = rawAddress.region;
		
		return newAddress;
	};
}

function InvestorCreator()
{
	var self = this;
	self.addressCreator = new AddressCreator();
	self.create= function(rawInvestor)
	{
		var newInvestor = new UserDomainsObjectFile.Investor();
		newInvestor.id = rawInvestor.id;
		newInvestor.userName = rawInvestor.userName;
		newInvestor.password = rawInvestor.password;
		newInvestor.email = rawInvestor.email;
		newInvestor.memberSince = rawInvestor.memberSince;
		newInvestor.shippingAddress = self.addressCreator.create(rawInvestor.shippingAddress);
		return newInvestor;
	};	
	
	self.createBlank = function()
	{
		return new  UserDomainsObjectFile.Investor();
	};
}

function UserCollectionGateWay()
{
	var self = this;
	//private variables;
	var mongoClient = require('mongodb').MongoClient;
	var assert = require('assert');
	var ObjectID = require('mongodb').ObjectID;
	 // Connection URL
	 var url = 'mongodb://127.0.0.1:27017/test';
	 
	 var getMaxID = function(userCollection,callBack)
		{		 		
			var c = userCollection.find({},{id:1}).sort({id:-1}).limit(1);
			c.toArray(function(err,docs)
					{					
						callBack(docs[0].id);
					});
			
		};
		
		
	 self.update = function (user,doWhenDone)
	 {
		 mongoClient.connect(url,function(err,db)
				 {
						var userCollection = db.collection('Users');
						
						console.log("start treating");
						userCollection.update({_id:user._id},{$set:user},function(err,count){
					
							if(!err)
				 				{console.log('sucessfully inserted ' + count.insertedCount + ' user documents');}
							else
								{console.log(err);}
							
				 			});
				 				 
				 });
	 };
	 self.getAll = function (doWhenFound)
	 {
		 mongoClient.connect(url, function(err, db) {
			
			 var userCollection = db.collection('Users');
			 var cursor = userCollection.find({});
			 cursor.toArray(function (err,docs)
					  {	
				 		doWhenFound(docs);
				 	 	//console.log(docs);
				 	 	db.close();
					  });		 
		 }); 	
	 };	
	
	 self.insert= function(newUser,doWhenDone)
	 {
		 mongoClient.connect(url,function(err,db)
		 {
			 try
			 {
				 
				 var userCollection = db.collection('Users');
		 			
		 			getMaxID(userCollection,function(maxId){
		 				console.log(maxId);
		 				
		 				newUser.id = maxId+1;
		 				userCollection.insert(newUser,function(err, count)
			 			{
		 					doWhenDone(err);
			 				console.log(count);
			 				console.log('sucessfully inserted ' + count.insertedCount + ' user documents');
			 				db.close();
			 			});	 				
		 			});	 
			 }
			 catch(e)
			 {
				 console.log("gateway:There is a problem here");
				 console.log(e);
				 doWhenDone(e);			
			 }
	 						
		 });
	 };
	
}

function UserFinder()
{
	var self = this;
	var dB = new UserCollectionGateWay();
	var userCreator = new InvestorCreator();
		
	self.getBlankInvestor = function ()
	{
		return userCreator.createBlank();
	};
	
	
	
		
	self.findAllUsers = function(doWhenFound)
	{
		 function whenIFindData(docs)
			{
			//console.log(docs);
				var result = Array();
				for(var i= 0 ; i<docs.length; i++)
				{
					result[i] = userCreator.create(docs[i]);
				}
				
				doWhenFound(result);
			}
		
		dB.getAll(whenIFindData);
	};
	
}

function UserMapper()
{
	var self = this;
	var collectionGateWay = new UserCollectionGateWay();
	
	
	
	self.insert= function (user,doWhenDone)
	{
		//console.log("about to insert user");
		try
		{	
			var getInsertResults = function(err)
			{
				console.log("getting insert results");
				try
				{
					doWhenDone(err);
				}
				catch(e)
				{
					console.log("callback error");
					doWhenDone(e);
				}
			};
			collectionGateWay.insert(user,getInsertResults);
		}
		catch(e)
		{
			 console.log("mapper:There is a problem here");
			doWhenDone(e);
		}
	
	};
}
//exporting to UserModel module
exports.UserFinder = UserFinder;
exports.UserMapper = UserMapper;


