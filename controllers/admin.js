const Blog = require('../models/blog');

exports.getBlogs = (req, res, next) => {
    Blog.fetchAll(blogs => {
        res.render('admin/blog', {
            pageTitle: '/Admin Blog',
            path: '/admin/blogs',
            blogs: blogs
        });
    });
};

exports.getAddBlog = (req, res, next) => {
    res.render('admin/add-blog', {
        pageTitle: 'Add Blog',
        path: '/admin/add-blog',
        editing: false
    });
};

exports.postAddBlog = (req, res, next) => {
    const order = req.body.order;
    const blog = req.body.blog;
    const newBlog = new Blog(null, order, blog);
    newBlog.save();
    res.redirect('/admin/blogs');
};

exports.getEditBlog = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const blogId = req.params.blogId;
    Blog.findById(blogId, blog => {
        if (!blog) {
            return res.redirect('/');
        }
        res.render('admin/add-blog', {
            pageTitle: 'Edit Blog',
            path: '/admin/edit-blog',
            editing: editMode,
            blog: blog
        });
    });
};

exports.postEditBlog = (req, res, next) => {
    const id = req.body.blogId;
    const order = req.body.order;
    const blog = req.body.blog;
    const updatedBlog = new Blog(
        id,
        order,
        blog
    );
    updatedBlog.save();
    res.redirect('/admin/blogs');
};

exports.postDeleteBlog = (req, res, next) => {
    const blogId = req.body.blogId;
    Blog.deleteById(blogId);
    res.redirect('/admin/blogs');
};