'use strict';
var mongoose = require('mongoose');
var multer = require('multer');
var formidable = require('formidable');
var upload = multer({dest: DIR}).single('photo');
var DIR = './uploads/';

var product = {

	create : function(req , res , next)
	{
		var fieldsToSet =
		{
			brand      : req.body.brand,
			category   : req.body.category,
			variations : req.body.variations
		};

		req.app.db.models.Product.create(fieldsToSet,
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
			brand      : req.body.brand,
			category   : req.body.category,
			variations : req.body.vars
		};

		var options = { new : true };

		req.app.db.models.Product.findByIdAndUpdate(
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

		req.app.db.models.Product.find({},
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
		req.app.db.models.Product.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	remove : function(req , res , next)
	{

	  	req.app.db.models.Product.findByIdAndRemove(req.params.id,
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});

	  },
		upload: function(req, res, next)
		{
     var path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path);
  });
}


}
module.exports = product;
