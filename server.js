var express = require('express');
var mongoose = require('mongoose');
var createNpcController = require('./server/api/createNpcController');
var slainNpcController = require('./server/api/slainNpcController');
var config = require('./server/config/config');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 3000));

mongoose.connect(config.database);

createNpcController(app);
slainNpcController(app, io);

app.use(express.static(__dirname + '/client'));

io.on('connection', function(socket) {
  console.log('A user has connected');

  socket.on('disconnect', function(msg) {
    console.log('A user has diconnected');
  });
});

server.listen(app.get('port'), function(){
  console.log('[%s] Server is listening on port %s', new Date(), app.get('port'));
});
