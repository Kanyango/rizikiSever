'use strict';

var cluster = require('cluster');

if(cluster.isMaster)
{
	var numWorkers = require('os').cpus().length;

	console.log('Master cluster is running' + numWorkers + 'workers.....');

	for(var i = 0; i< numWorkers ; i++)
	{
		cluster.fork();
	}
	cluster.on('online' , function(worker){
		console.log('Worker' + worker.process.id + 'is online' );
	});
	cluster.on('exit' , function(worker , code , signal){
		console.log('Worker' + worker.process.id + ' died with code: ' + code + ', and signal: ' + signal);
	});
}else{

	require('./app');
}