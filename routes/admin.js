const path = require('path');

const express = require('express');
const passport = require('passport');

const router = express.Router();

const adminController = require('../controllers/admin');

// Admin routes
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin/blogs',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('admin/login', {
        pageTitle: "Login"
    });
});

router.delete('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

router.get('/admin/blogs', checkAuthenticated, adminController.getBlogs);

router.get('/admin/add-blog', checkAuthenticated, adminController.getAddBlog);

router.post('/admin/add-blog', checkAuthenticated, adminController.postAddBlog);

router.get('/admin/edit-blog/:blogId', checkAuthenticated, adminController.getEditBlog);

router.post('/admin/edit-blog', checkAuthenticated, adminController.postEditBlog);

router.post('/admin/delete-blog', checkAuthenticated, adminController.postDeleteBlog);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/admin/blogs')
    }
    next()
}

module.exports = router;