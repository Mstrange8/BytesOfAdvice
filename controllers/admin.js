exports.getBlogs = (req, res, next) => {
    Education.fetchAll(education => {
        res.render('admin/public/education', {
            pageTitle: '/Admin Education',
            path: '/admin/education',
            eds: education
        });
    });
};

exports.getAddBlog = (req, res, next) => {
    res.render('admin/public/add-education', {
        pageTitle: 'Add Education',
        path: '/admin/add-education',
        editing: false
    });
};

exports.postAddBlog = (req, res, next) => {
    const order = req.body.order;
    const school = req.body.school;
    const date = req.body.date;
    const degree = req.body.degree;
    const description = req.body.description;
    const education = new Education(null, order, school, date, degree, description);
    education.save();
    res.redirect('/admin/education');
};

exports.getEditBlog = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const eduId = req.params.educationId;
    Education.findById(eduId, education => {
        if (!education) {
            return res.redirect('/');
        }
        res.render('admin/public/add-education', {
            pageTitle: 'Edit Education',
            path: '/admin/edit-education',
            editing: editMode,
            ed: education
        });
    });
};

exports.postEditBlog = (req, res, next) => {
    const id = req.body.educationId;
    const order = req.body.order;
    const school = req.body.school;
    const date = req.body.date;
    const degree = req.body.degree;
    const description = req.body.description;
    const updatedEducation = new Education(
        id,
        order,
        school,
        date,
        degree,
        description
    );
    updatedEducation.save();
    res.redirect('/admin/education');
};

exports.postDeleteBlog = (req, res, next) => {
    const eduId = req.body.educationId;
    Education.deleteById(eduId);
    res.redirect('/admin/education');
};