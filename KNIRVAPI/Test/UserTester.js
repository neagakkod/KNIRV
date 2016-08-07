var Promise = require('promise');
var promiseFn = function(accept,reject)
{
	accept()
}

var p = new Promise (promiseFn);
p.then(function(){
	console.log("Iaccept")
})