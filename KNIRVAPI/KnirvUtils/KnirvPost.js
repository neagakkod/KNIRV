var nodemailer = require('nodemailer');	

function KnirvPost(){
	
	var self = this;
	
	var configs= {
			service:"Gmail",
			auth:{user:"lemanod@gmail.com",pass:"duquerr4"}
	};
	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport(configs);//('smtps://user%40gmail.com:pass@smtp.gmail.com');

	// setup e-mail data with unicode symbols
	var mailOptions = {
	    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
	    to: 'kuaminika@gmail.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: 'Hello world 🐴', // plaintext body
	    html: '<b>Hello world 🐴</b>' // html body
	};
	self.sendMail =function()
	{
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
	};
	
	self.reportError = function(errorObject)
	{
		mailOptions.to="kuaminika@gmail.com";
		mailOptions.from= '"KNIRV ERROR ALLERT 👥" <foo@blurdybloop.com>';
		mailOptions.subject = "ERROR IN KNIRV";
		mailOptions.text = errorObject.toString();
		mailOptions.html = errorObject.toHTMLString();
		
		console.log(mailOptions);
		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
	};
	
}

exports.KnirvPost = KnirvPost;