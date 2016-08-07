/**
 * http://usejsdoc.org/
 */

var DomainObject = function()
{
	
	this.genericGetBlankFields= function(blnkFields)
	{
		var fieldList = [];  
    	
    	for (var key in blnkFields)
    	{
    		if(this[key]===blnkFields[key].val)
    		{
    			fieldList.push(blnkFields[key].name);
    		}
    	}
    	return fieldList;
	};
};
var BlankFieldFinder = function()
{
	
};

exports.DomainObject = DomainObject;