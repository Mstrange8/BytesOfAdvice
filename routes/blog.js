const path = require('path');

const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blog');

router.get('/', blogController.getBlogPage);

router.post('/', blogController.getBlogPage);

module.exports = router;