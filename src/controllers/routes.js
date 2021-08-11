const express = require('express');

const router = express.Router();
const { searchJobs } = require('./search');
const { errorNotFound, errorServer } = require('./error');

router.get('/search-jobs', searchJobs);
router.use(errorNotFound);
router.use(errorServer);

module.exports = router;
