exports.getServicePage = (req, res, next) => {
    res.render('services', {
        pageTitle: 'Services',
        path: '/services'
    });
};