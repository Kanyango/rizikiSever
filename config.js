'use strict';

exports.hostname = process.env.hostname || '127.0.0.1';
exports.port = process.env.PORT || 8300;
exports.mongodb = {
	uri: 'mongodb://127.0.0.1:27017/rizikiDB'
	//uri: ' mongodb://DaveBuddy:bmw760li@ds015915.mlab.com:15915/buddyappdb'
};
exports.secret = 'b7TY?>m6wl_i/<';
