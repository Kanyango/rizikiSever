'use strict';
var mongoose = require('mongoose');
var passport = require('passport'); 

var user = {

	create : function(req , res , next)
	{
		if(!req.body.username || !req.body.password)
		{
			res.status(400).json({message : 'Please fill out the fields'});
		}

		req.app.db.models.User.findOne({username: req.body.username , 
			                            phone: req.body.phone},
			function(err , user){
				if(user)
				{

					res.status(500).json('Username already taken');

				}
			});

		var user = new req.app.db.models.User();

		user.username = req.body.username;
		user.email = req.body.email;
		user.phone = req.body.phone;
		user.subscription = 'pending';
		user.setPassword(req.body.password)

		user.save(function(err){
			if(err)
			{
				return next(err);
			}

			return res.json({token: user.generateJwt()})
		});
  },

	login : function(req , res , next)
	{
		if(!req.body.username && !req.body.password)
		{
			return res.status(400).json({message : 'Error fill out the fields'});
		}
		passport.authenticate('local' , function(err , user , info){
			if(err){
				return next(err);
			}
			if(user)
			{
				return res.json({token : user.generateJwt()});
			}
			else{
				return res.status(401).json(info);
			}
		})(req , res , next);
	},

	update : function(req , res , next)
	{
	 	var fieldsToSet = {

	 		bname : req.body.bname,

	 	};
	 	var options = { new : true};

	 	req.app.db.models.User.findByIdAndUpdate(req.payload._id,
	 		fieldsToSet , options ,function(err , docs){
	 			if(err)
	 			{
	 				return next(err);
	 			}
	 			res.status(200).json(docs);
	 		});
	},

	readProfile : function(req  , res , next)
	{
		 if(!req.payload._id){
            res.status(401).json({
                "message" : "Unauthorized"
            });
        }
        else{

         req.app.db.models.User.findById(req.payload._id)
            .exec(function(err , user){
                res.status(200).json(user);
            });
        }
	},
	settings  : function(req , res , next)
	{
		req.app.db.models.User.findById(req.payload._id , 
			function(err , info){
				if(err)
				{
					return next(err);
				}
				res.status(200).json(info);
			});
	},
	upsett : function(req , res , next)
	{
		var fieldsToSet = 
		{
			bname : req.body.bname,
			bphone : req.body.bphone,
			location : req.body.location,
			website : req.body.website,
			address : req.body.address
			
		}
		req.app.db.models.User.findByIdAndUpdate(req.payload._id ,
		fieldsToSet , {new : true} , function(err , info){
			if(err)
			{
				return next(err);
			}

			res.status(200).json(info);
		});
	}

};
module.exports = user;