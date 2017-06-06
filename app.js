/**
 * Created by dev on 2017-06-04.
 */

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');



var loginRoute = require('./routes/LoginRoute');
var productRoute = require('./routes/ProductRoutes');

var app = express();
app.set('port', 3000);


app.set(express.static(path.join(__dirname, 'public')));

app.engine('html', cons.swig)
console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


  var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
  });


app.use('/login',loginRoute);
app.use(['/getAllItems','/chectItemQuantity','/updateItems'],productRoute);


 app.get('*', function(req, res) {
     res.sendFile(__dirname + '/public/index.html');
        });

 

module.exports = app;
