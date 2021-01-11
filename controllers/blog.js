exports.getBlogPage = (req, res, next) => {
    res.render('blog', {
        pageTitle: 'Blog',
        path: '/'
    });
};