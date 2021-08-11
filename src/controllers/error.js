const path = require('path');

function errorNotFound(req, res) {
  res.status(404).sendFile(path.join(__dirname, '..', '..', 'public', '404.html'));
}

// eslint-disable-next-line no-unused-vars
function errorServer(error, req, res, next) {
  res.status(500).sendFile(path.join(__dirname, '..', '..', 'public', '500.html'));
}

module.exports = { errorNotFound, errorServer };
