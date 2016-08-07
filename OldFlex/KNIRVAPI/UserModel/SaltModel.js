/**
 * http://usejsdoc.org/
 */
var knirvDbFile  =  require("../KnirvUtils/KnirvDB");
 function Salt()
 {
	 this.id=-1;
	 this.user_id=-1;
	 this.value="";
 }
function SaltModel(crypto)
{
	var self = this;
	//private variables;
	var knrivDB = new knirvDbFile.KnirvDB();
	
	 self.createNewSalt = function (){ 
		 var result =  new Salt();
		 result.value = crypto.randomBytes(128).toString('base64');
		 return result;
	 };
	 
	 self.getSaltByUser = function (user_id,transactionCallBack)
	 {
		var getSaltTransaction = function(err, db)
		{
			 var saltCollection = db.collection('Salt');
			 var queryObject = {"user_id":user_id};
			 var cursor = saltCollection.find(queryObject);
			 
			 cursor.toArray(function(err,count){
				
				 transactionCallBack(err,count);
				 db.close();
			 });			
		};
		 knrivDB.executeTransaction(getSaltTransaction);
	 };
	 
	 self.insert= function(newSalt,doWhenDone)
	 {		 
		 var insertTransaction  = function(err,db)
		 {
			 try
			 {
				 
				 var saltCollection = db.collection('Salt');
		 		
				 knrivDB.getMaxID(saltCollection,function(maxId)
		 					{			 			
				 				newSalt.id = maxId+1;
				 				saltCollection.insert(newSalt,function(err, count)
					 			{
				 					doWhenDone(err,count);
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
	 						
		 };
		 
		 
		 knrivDB.executeTransaction(insertTransaction);
	 };
	
}

exports.SaltModel = SaltModel;

