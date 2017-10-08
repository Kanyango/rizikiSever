'use strict';
var mongoose = require('mongoose');
var multer = require('multer');
var formidable = require('formidable');
//var upload = multer({dest: DIR}).single('photo');
//var DIR = './uploads/';
var apikey   = 'b08b2c77192e5dc068f327209015659596c3eb85cda37524729622dd0968d53e';
var cloudinary = require('cloudinary');

var product = {

	create : function(req , res , next)
	{
		var fieldsToSet =
		{
			brand      : req.body.brand,
			category   : req.body.category,
			photo      : 'my photo',
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
			photo      : 'my photo',
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
		
		console.log('Sisi ni body' + req.body);
				var storage = multer.diskStorage({
					destination: function(request , file , callback)
					{
						callback(null , './server/uploads');
					},
					filename: function (request, file, callback) {
				    callback(null, file.originalname)
				  }
				});


		     var upload = multer({ //multer settings
				    storage: storage
				}).single('file');

				upload(req,res,function(err){
			    if(err){
				 res.json({error_code:1,err_desc:err});
				 return;
			    }
		//res.json({error_code:0,err_desc:null});
					
		//res.json({sent: req.body});
					
		var pathy = req.file.path;
					
		cloudinary.config({ 
		  cloud_name: 'dxomvhu0p', 
		  api_key: '811296612498678', 
		  api_secret: 'j8BV1pcR-Jagxi63jCJSAMrImVM' 
		});
			cloudinary.v2.uploader.upload(pathy,
			function(error, result) {
				
			 console.log('Iam the error' + error);	
			 console.log('two ' + result.secure_url);
				
			 //res.status(200).json(result);
				
			 var fieldsToSet = { photo : result.secure_url };
			 var options = { new : true };
			
			var id = mongoose.Types.ObjectId(req.params.id);
				
			req.app.db.models.Product.findByIdAndUpdate(
				{"_id": id, "variations.packsize" : req.body.prodName},
				fieldsToSet, options, 
				function(err , docs){
					if(err)
				{
					return next(err);
				}
				 res.status(200).json(docs);
				});
				
			 }); 
		}); 

	}

}
module.exports = product;
