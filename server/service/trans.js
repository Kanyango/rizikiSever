'use strict';
var mongoose = require('mongoose');


var trans = {

	create : function(req , res , next)
	{
		var fieldsToSet = 
		{
			code       : req.body.trans_code,
			from	   : req.body.from,
			to	  	   : req.body.to, 
			amount     : req.body.amount,
			account    : req.body.account
	
		};
		
		req.app.db.models.Transaction.create(fieldsToSet, 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	/*update : function(req , res , next)
	{
		var id = req.body.id;
		var fieldsToSet = 
		{
			brand      : req.body.brand,
			category   : req.body.category,
			variations : req.body.vars
		};

		var options = { new : true };

		req.app.db.models.Transaction.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },*/
	read : function(req , res , next)
	{
		
		req.app.db.models.Transaction.find({},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	single : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);
		req.app.db.models.Transaction.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	/*remove : function(req , res , next)
	{

	  	req.app.db.models.Product.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});

	  }*/
	  
}
module.exports = trans;
