const path = require('path');

const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blog');

router.get('/', blogController.getBlogs);

router.post('/', blogController.getBlogs);

router.get('/blog/:blogId', blogController.getBlogPage);

router.post('/blog/:blogId', blogController.getBlogPage);

module.exports = router;