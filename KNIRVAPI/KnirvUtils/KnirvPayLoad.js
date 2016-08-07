/**
 * http://usejsdoc.org/
 */
exports.PayLoad = function  (request)
{
	this.timeCreated = new Date().getTime() ;
	this.timeExpires = this.timeCreated+ (60*60*1000); 
	this.userName = request.body.userName;
	this.clientType = request.headers["user-agent"];
	this.clientIP = request.headers.origin;
	this.requestHeaders= request.headers;
};