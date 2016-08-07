/**
 * http://usejsdoc.org/
 */
function KnirvDB()
{
	var mongoClient = require('mongodb').MongoClient;
	var assert = require('assert');
	var ObjectID = require('mongodb').ObjectID;
	 // Connection URL
	 var url = 'mongodb://127.0.0.1:27017/test';
	 this.getMaxID = function(collection,callBack)
		{
		 	// doing a find all on collection and sorting it desc
			var c = collection.find({},{id:1}).sort({id:-1}).limit(1);
			c.toArray(function(err,docs)
					{	
						var theId = docs.length>0 ?docs[0].id:0;
						callBack(theId);
					});
			
		};
	 this.executeTransaction = function(transaction){
		 							mongoClient.connect(url,transaction);
								 };
}

exports.KnirvDB = KnirvDB;