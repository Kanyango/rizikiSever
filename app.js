var config  = require('./config');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var http     = require('http');
var path     = require('path');
var jwt      = require('jsonwebtoken');
//var access   = require('./access');
var emitter  = require('events').EventEmitter.prototype._maxListeners = 100;

var app = express();

app.config = config;

app.server = http.createServer(app);

app.db = mongoose.createConnection(config.mongodb.uri);
app.db.once('open', function(){

});

require('./models')(app, mongoose);

app.set('port' , config.port);

app.use(express.static(__dirname + '/rizikiAdmin/src'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: true,
    saveUninitialized: false,
    secret: 'a4f8071f-c873-4447-8ee2',
    store: new mongoStore({url : app.config.mongodb.uri})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

require('./passport')(app , passport);

require('./routes')(app , passport);

app.server.listen(process.env.PORT || 8300);

console.log('Process ' + process.pid + ' is listening to all incoming requests');
