const Blog = require('../models/blog');

exports.getBlogPage = (req, res, next) => {
    const blogTitle = req.params.blogTitle;        
    Blog.findByTitle(blogTitle, blog => {
        res.render('chosen-blog', {
            pageTitle: 'Blog',
            path: '/' + blogTitle,
            blog: blog
        });
    });  
};

exports.getBlogs = (req, res, next) => {
    Blog.fetchAll(blogs => {
        res.render('blog', {
            pageTitle: 'Blog',
            path: '/',
            blogs: blogs
        });
    });
};