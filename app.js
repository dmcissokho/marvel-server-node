var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var characters = require('./routes/characters');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/characters', characters);


app.use(function(req, res, next) {
    res.status(404);
    res.send('404: Route not found');
});

module.exports = app;
