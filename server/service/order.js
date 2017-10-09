'use strict';
var mongoose = require('mongoose');


var order = {

	create : function(req , res , next)
	{
		var fieldsToSet = 
		{
			order_no   : req.body.order_no,
			from	   : req.body.from,
			//to	   : req.body.to, 
			products   : req.body.products,
			total      : req.body.total,
			status     : req.body.stats,
			//delivery   : req.body.delivery,
			payment    : req.body.payment
		};
		
		req.app.db.models.Order.create(fieldsToSet, 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	update : function(req , res , next)
	{
		var id = req.body.id;
		var fieldsToSet = 
		{
			status     : req.body.stats,
		};

		var options = { new : true };

		req.app.db.models.Order.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },
	read : function(req , res , next)
	{
		
		req.app.db.models.Order.find({},
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
		req.app.db.models.Order.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	}
	/*remove : function(req , res , next)
	{

	  	req.app.db.models.Activity.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});

	  }*/
	  
}
module.exports = order;
