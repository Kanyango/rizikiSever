'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var orderSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	order_no   : {type: String},
	//from	   : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	from       : {name: String, phone: String},
	//to	  	   : {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
	products   : [],
	total      : {type: String},
	//status     : {type: String},
	//delivery   : {type: String},
	payment    : {type: String}


	});
	app.db.model('Order', orderSchema);
};
