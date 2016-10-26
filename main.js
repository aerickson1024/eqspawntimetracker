var express = require('express');
var incomingTrafficeController = require('./server/api/incomingTrafficController');
var app = express();

app.set('port', (process.env.PORT || 3000));

incomingTrafficeController(app);

app.use(express.static(__dirname + '/client'));

app.listen(app.get('port'), function(){
  console.log('Server is listening on port ', app.get('port'));
});
