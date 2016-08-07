/**
 * http://usejsdoc.org/
 */
var KnirvPostFile = require("./KnirvPost");
function KnirvRequestResponse()
{
	this.error = false;
	this.message = "";
}

function KnirvObjectRequestResponse(object)
{
	KnirvRequestResponse.call(this);	
	var objectIsGoodForShow = object && object !==null;
	this.requested = objectIsGoodForShow ? object : {};
}


function KnirvError(name,message,stack)
{
	var self = this;
	self.name = name;
	self.message = message;
	self.stack = stack;

	
	self.toHTMLString = function()
	{

		var result = "<table>" ;
				result +="<tr><th colspan='2'>"+self.name+"</th></tr>";
				result +="<tr><td>Message</td><td>"+self.message+"</td></tr>";
				result +="<tr><td>Stack</td><td>"+self.stack+"</td></tr>";
			result +="</table>";
		return result;
	};	
	
	self.toString = function()
	{
		var result = "error:"+ self.name;
		result +="\n"+"-------------------------";
		result +="\n"+"message:"+self.message;
		result +="\n"+"stack"+self.stack;
		result +="\n"+"-------------------------";
		return result;
	};
	
}

function KnirvErrorRequestResponse(jSErrorObject)
{
	KnirvRequestResponse.call(this);
	
	var objectIsGoodForShow = jSErrorObject && jSErrorObject !==null;
	
	if(objectIsGoodForShow)
	{
		var err = new KnirvError(jSErrorObject.name,jSErrorObject.message,jSErrorObject.stack);
	//	console.log(err)
		var postAgent = new KnirvPostFile.KnirvPost();
		postAgent.reportError(err);
		this.errorObject = err;
	}
	else
	{
		this.errorObject = {};
	}
		
	this.error = true;

	console.log(this);

}

exports.KnirvRequestResponse = KnirvRequestResponse;
exports.KnirvObjectRequestResponse = KnirvObjectRequestResponse;
exports.KnirvErrorRequestResponse = KnirvErrorRequestResponse;