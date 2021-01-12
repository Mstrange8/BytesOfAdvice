const path = require('path');

const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blog');

router.get('/', blogController.getBlogs);

router.post('/', blogController.getBlogs);

router.get('/blog/:blogTitle', blogController.getBlogPage);

router.post('/blog/:blogTitle', blogController.getBlogPage);

module.exports = router;