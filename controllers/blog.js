const Blog = require('../models/blog');

exports.getBlogPage = (req, res, next) => {
    const blogId = req.params.blogId;        
    Blog.findByTitle(blogId).then(blog => {
        res.render('chosen-blog', {
            pageTitle: 'Blog',
            path: '/' + blogId,
            blog: blog
        });
    })
    .catch(err => {
        console.log(err);
    });  
};

exports.getBlogs = (req, res, next) => {
    Blog.fetchAll().then(blogs => {
        res.render('blog', {
            pageTitle: 'Blog',
            path: '/',
            blogs: blogs
        });
    })
    .catch(err => {
        console.log(err);
    });
};