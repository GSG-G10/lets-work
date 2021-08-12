const path = require('path');
const express = require('express');
const compression = require('compression');
const router = require('./controllers');

const app = express();

app.use(compression());
app.disable('x-powered-by');
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public'), { maxAge: '30d' }));

app.set('port', process.env.PORT || 5000);

app.use(router);

module.exports = app;
