require('env2')('.env');
const fetch = require('node-fetch');

const { APP_ID, APP_KEY } = process.env;

function searchJobs(req, res) {
  const searchJob = req.query.q;

  const url = `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=6&what=${searchJob}&content-type=application/json`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(500);
      res.json(err);
    });
}

module.exports = { searchJobs };
