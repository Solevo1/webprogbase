const express = require('express');
const app = express();
const mustache = require('mustache-express')
const consolidate = require('consolidate');
const path = require('path');
const viewsDir = path.join(__dirname, 'views');
const partialsDir= path.join(viewsDir,'partials');
app.engine('mst', mustache(partialsDir));
app.set('views', viewsDir);
app.set('view engine', 'mst');




const morgan = require('morgan');
app.use(morgan('dev'));
const userRouter = require('./routes/users');
const operatorRouter = require('./routes/operators');
const mediaRouter = require('./routes/media.js');

const busboy = require('busboy-body-parser');
const busboyOptions = {
    limit: '10mb',
    multi: false,
};
app.use(busboy(busboyOptions));
app.use(express.static('public'));
// app.use(function(req, res){console.log('Non-static request');});

app.get('/', function(req, res) {
    res.render('index');
});
app.get('/about', function(req, res) {
    res.render('about');
});
app.use('/users', userRouter);
app.use('/operators', operatorRouter);
app.use('/api/media', mediaRouter);
const expressSwaggerGenerator = require('express-swagger-generator');
const expressSwagger = expressSwaggerGenerator(app);

const options = {
    swaggerDefinition: {
        info: {
            description: 'documentation',
            title: 'JSON HTTP API веб-сервер',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        produces: ["application/json"],
    },
    basedir: __dirname,
    files: ['./routes/**/*.js', './models/**/*.js'],
};

expressSwagger(options);


app.listen(3005, function () { console.log('Server is ready'); });


