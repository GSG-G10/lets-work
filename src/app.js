require('env2')('.env');
const express = require('express');

const app = express();

app.set('port', process.env.PORT || 5000);

module.exports = app;
