const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/admin/blogs', adminController.getBlogs);

router.get('/admin/add-blog', adminController.getAddBlog);

router.post('/admin/add-blog', adminController.postAddBlog);

router.get('/admin/edit-blog/:blogTitle', adminController.getEditBlog);

router.post('/admin/edit-blog', adminController.postEditBlog);

router.post('/admin/delete-blog', adminController.postDeleteBlog);

module.exports = router;