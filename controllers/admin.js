const Blog = require('../models/blog');


// Admin Controllers
exports.getAdmin = (req, res, next) => {
    res.render('admin/admin', {
       pageTitle: 'Login',
       path: '/admin' 
    });
};

exports.getBlogs = (req, res, next) => {
    Blog.fetchAll().then(blogs => {
        res.render('admin/blogs', {
            pageTitle: 'Admin Blog',
            path: '/admin/blogs',
            blogs: blogs
        });
    })
    .catch(err => {
        console.log(err);
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
    const title = req.body.title;
    const blog = req.body.blog;
    const newBlog = new Blog(order, title, blog, null);
    newBlog.save()
    .then(() => {
        res.redirect('/admin/blogs');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getEditBlog = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const blogId = req.params.blogId;
    console.log(blogId);
    Blog.findByTitle(blogId)
        .then(blog => {
        console.log(blog);
        res.render('admin/add-blog', {
            pageTitle: 'Edit Blog',
            path: '/admin/edit-blog',
            editing: editMode,
            blog: blog
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postEditBlog = (req, res, next) => {
    const blogId = req.body.blogId;
    const order = req.body.order;
    const title = req.body.title;
    const blog = req.body.blog;
    const updatedBlog = new Blog(
        order,
        title,
        blog,
        blogId
    );
    updatedBlog.save()
    .then(() => {
        res.redirect('/admin/blogs');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postDeleteBlog = (req, res, next) => {
    const blogId = req.body.blogId;
    Blog.deleteByTitle(blogId)
    .then(() => {
        res.redirect('/admin/blogs');
    })
    .catch(err => {
        console.log(err);
    });
};