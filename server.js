var express  = require('express');
var app = express();
var port = 8080;

var path = require('path');
var bodyParser = require('body-parser');
var displayHandler = require('./handlers/displayhandler');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'assets')));

// middleware для обработки данных в формате JSON
app.use(bodyParser.json());
app.use(bodyParser.text());

// загрузить таблицу с элементами если было обновление таблицы.
app.get('/', displayHandler.displayItemsGet);
//отдавать в ajax
app.post('/', displayHandler.displayItemsPost);

app.use(function(err, req, res, next) {
    if (err) console.log(err.stack);
    res.status(500).send('oops... something went wrong');
});

app.listen(port, function() {
    console.log('server started on ' + port + ' port');
});