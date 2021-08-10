require('env2')('.env');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('port', process.env.PORT || 5000);

module.exports = app;
