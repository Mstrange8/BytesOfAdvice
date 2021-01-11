const Blog = require('../models/blog');

exports.getBlogPage = (req, res, next) => {
    Blog.fetchAll(blogs => {
        res.render('blog', {
            pageTitle: 'Blog',
            path: '/',
            blogs: blogs
        });
    })
};