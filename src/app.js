require('env2')('.env');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const { APP_ID, APP_KEY } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/search-jobs', (req, res) => {
  const searchJob = req.query.q;

  const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=20&what=${searchJob}&content-type=application/json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => data);
});

app.set('port', process.env.PORT || 5000);

module.exports = app;
