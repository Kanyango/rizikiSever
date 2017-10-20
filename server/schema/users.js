'use strict';

var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

module.exports = function(app , mongoose)
{
	var userSchema = new mongoose.Schema({
		username : {type: String , unique: true , lowercase: true},
		hash     : String,
		salt     : String,
		phone    : {type: String , unique: true},
		email    : String,
		bname    : String,
	    //industry : String,
	    location : String,
	    address  : String,
	    bphone   : String,
	    office   : String,
	    website  : String,
		timeCreated : {type: Date , default: Date.now},
		
		
		
	});	
	userSchema.methods.setPassword = function(password){

		this.salt = crypto.randomBytes(16).toString('hex');
		this.hash = crypto.pbkdf2Sync(password , this.salt , 1000 , 512, 'sha512').toString('hex');
	};
	userSchema.methods.validatePassword = function(password) {
     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
     return this.hash === hash;
   };
	userSchema.methods.generateJwt  =  function(){

		var today = new Date();
		var exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({_id: this._id ,
                          username : this.username ,
                          exp: parseInt(exp.getTime() / 1000), } , app.config.secret );
	}; 
    app.db.model('User', userSchema);
	//mongoose.model('User' , userSchema);
};
