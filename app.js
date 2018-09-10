var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var port = (process.env.PORT || process.env.VCAP_APP_PORT || 2000);



//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var index = require('./routes/index');

app.use('/', index);
//app.use('/account',account);

var server = app.listen(port,function(){
	console.log('Server running at http://127.0.0.1:'+port);
});
