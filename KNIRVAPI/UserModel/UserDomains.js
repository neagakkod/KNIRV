/**
 * http://usejsdoc.org/
 */

 function Address ()
{
	var self= this; 
	self.streetAddress = "";
	self.city = "";
	self.region = "";
	self.country = "";
	self.postal_code = "";
}


 function Bank()
{
	var self = this;
	self.name = "banks name";
	self.accountNumber = "account no";
	self.routingNumber = "routing no";
}


function BillingInfo ()
{
	var self = this;
	self.firstName = "first name";
	self.firstName = "first name";
	self.address = new Address();
	self.bank = new Bank();
}

function Card()
{	
	var self = this;
	self.endingCardNumber="0000";
	self.expirationDate = new Date();
	self.type="";
}

/*
 * User Classes 
 * */
function User()
{
	var self= this;

	self.id= -1;
	self.userName  = "";
	self.password  = "";
	self.email     = "";
	self.firstName = "";
	self.lastName  = "";
	self.memberSince = new Date();	
}

//Investor extends User
function Investor()
{
	//extending from User Class. 
	var self = this; 
	self.type = "Investor"; 
	User.call(this);
	var superGetBlankFields = self.getBlankFields;
	self.shippingAddress = new Address();
}

//Broker extends Investor
function Broker()
{
	//extending from Investor Class. 
	var self = this; 
	self.type = "Broker"; 
	Investor.call(this);
}

//exporting User Domain classes to "User Domain Module"
exports.User = User; 
exports.Investor = Investor;
exports.Broker = Broker;
exports.Address = Address;
exports.Bank = Bank;
exports.BillingInfo = BillingInfo;
 