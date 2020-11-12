const express = require('express');
const app = express();

const userRouter = require('./routes/users');
const operatorRouter = require('./routes/operators');
const mediaRouter = require('./routes/media.js');

const busboy = require('busboy-body-parser');
const busboyOptions = {
    limit: '10mb',
    multi: false,
};
app.use(busboy(busboyOptions));

app.use('/api/users', userRouter);
app.use('/api/operators', operatorRouter);
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


app.listen(3000, function () { console.log('Server is ready'); });


