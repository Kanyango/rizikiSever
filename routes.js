'use strict';
var mongoose = require('mongoose');
//var access  = require('./access');
//var redisClient = require('redis').createClient;
//var redis = redisClient(6379, 'localhost');
var config = require('./config');
//var jwt = require('express-jwt');
//var auth  = jwt({ secret : config.secret , userProperty: 'payload'});
var passport = require('./passport');
//var cache = require('express-redis-cache')();
//var cache = require('express-redis-cache')({ prefix: 'llabsApp' });

var order    = require('./server/service/order');
var product  = require('./server/service/product');
var trans    = require('./server/service/trans');
var user     = require('./server/service/users');


module.exports = function(app , passport)
{

    app.get('/order/:id'  ,  order.single);
    app.post('/order'  , order.create);
    app.put('/order/:id' , order.update);
    app.get('/order'  , order.read);

    app.delete('/product/:id'  ,  product.remove);
    app.put('/upload/:id'  ,  product.upload);
    app.post('/product'  , product.create);
    app.put('/product' , product.update);
    app.get('/product'  , product.read);

    app.get('/trans/:id'  ,  trans.single);
    app.post('/trans'  , trans.create);
    app.get('/trans'  , trans.read);

    app.post('/session/create' ,  user.create);
    app.post('/login' ,  user.login);
    //app.put('/settings', auth , user.upsett);
    //app.get('/settings', auth , user.readProfile);



    app.get('/logout' , function(req , res){
    	req.logout();
    	res.redirect('/');
    });

    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})
};
