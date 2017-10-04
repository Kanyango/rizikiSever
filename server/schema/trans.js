'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var transSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	code       : {type: String},
	from	   : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	to	  	   : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
	amount     : {type: String},
	account    : {type: String},
	


	});
	app.db.model('Transaction', transSchema);
};