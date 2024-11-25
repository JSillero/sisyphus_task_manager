const passFeedbackToView = (req, res, next) => {
    if (req.session.user == null) {
        res.redirect("/unauthorised");
    } else {
        next();
    }
};

module.exports = passFeedbackToView;