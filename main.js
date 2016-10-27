var express = require('express');
var mongoose = require('mongoose');
var createNpcController = require('./server/api/createNpcController');
var slainNpcController = require('./server/api/slainNpcController');
var config = require('./server/config/config');
var app = express();

app.set('port', (process.env.PORT || 3000));

mongoose.connect(config.database);

createNpcController(app);
slainNpcController(app);

app.use(express.static(__dirname + '/client'));

app.listen(app.get('port'), function(){
  console.log('Server is listening on port ', app.get('port'));
});
