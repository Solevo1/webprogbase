const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache-express')
const path = require('path');
const morgan = require('morgan');
const busboyBodyParser = require('busboy-body-parser');
const userRouter = require('./routes/users');
const operatorRouter = require('./routes/operators');
const mediaRouter = require('./routes/media.js');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const partialsDir= path.join(viewsDir,'partials');
app.engine('mst', mustache(partialsDir));
app.set('views', viewsDir);
app.set('view engine', 'mst');
app.use(morgan('dev'));
app.use(busboyBodyParser({ 
    limit: '10mb',
    multi: true,
}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/about', function(req, res) {
    res.render('about');
});
app.get('/data/media/:url', function(req, res) {
    res.sendFile(`${__dirname}/data/media/${req.params.url}`);
});
app.use('/users', userRouter);
app.use('/operators', operatorRouter);
app.use('/api/media', mediaRouter);

app.listen(3005, function () { console.log('Server is ready'); });


