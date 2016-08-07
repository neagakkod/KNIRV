/**
 * http://usejsdoc.org/
 */

var SaltModelFile = require("../UserModel/SaltModel");
var SaltModelTester = function ()
{
	var crypto = require('crypto');
	var saltModel = new  SaltModelFile.SaltModel(crypto); 
	this.testNewSalt = function()
	{
		var newSalt = saltModel.createNewSalt();
		console.log(newSalt);
		return newSalt;
	};
	
	this.testInsert = function(salt,doWhenInserted)
	{
		saltModel.insert(salt,doWhenInserted);
	};
	
	this.testGetByUser = function (user_id)
	{
		function testerCallb(errors,searchResult)
		{
			 console.log("errors:",errors);
			console.log("searchResult report:",searchResult);
		}


		saltModel.getSaltByUser(user_id,testerCallb)
	};
};

var tester = new SaltModelTester();

/*var salt = tester.testNewSalt();


var insertTestSuccessFunction = function ()
{
	console.log( "inserted");
};*/

//tester.testInsert(salt,insertTestSuccessFunction);

tester.testGetByUser(55);

