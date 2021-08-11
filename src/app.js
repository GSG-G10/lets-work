require('env2')('.env');
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const { APP_ID, APP_KEY } = process.env;

const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/search-jobs', (req, res) => {
  const searchJob = req.query.q;

  const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=6&what=${searchJob}&content-type=application/json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500);
      res.json(err);
    });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'));
});
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, '..', 'public', '500.html'));
});

app.set('port', process.env.PORT || 5000);

module.exports = app;
