var http          = require('http');
var https         = require('https');
var express       = require('express');
var bodyParser    = require('body-parser');
var path          = require('path');
var messageServer = require('./message_server');
var fs            = require('fs');

var root = process.cwd();
var pub = path.join(root, 'public');
var develop = process.env.NODE_ENV === 'develop' || false;

var app = express();
app.set('port', process.env.PORT || 4000);
app.set('sslPort', process.env.SSL_PORT || 4001);
app.set('views', path.join(pub));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

app.use(express.static(pub));
//app.post('/contact', messageServer);

app.get('/', function(req, res, next) {
  var file = getFile('index');
  if(file) {
    res.sendFile(file);
  } else {
    next();
  }
});

app.get('*', function(req, res, next) {
  var file = getFile(req.path);
  if(file) {
    res.sendFile(file);
  } else {
    next(null);
  }
});

http.createServer(app).listen(app.get('port'));

if (develop) {
  https.createServer({
    key: fs.readFileSync('ssl.key'),
    cert: fs.readFileSync('ssl.crt')
  }, app).listen(app.get('sslPort'));
}

function getFile(page) {
  var p = path.join(pub, page + '.html');
  return fs.existsSync(p) && p;
}
