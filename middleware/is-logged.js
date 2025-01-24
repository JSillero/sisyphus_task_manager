const passFeedbackToView = (req, res, next) => {
    if (req.session.user == null) {
        res.redirect("/unauthorised");
    } else {
        next();
    }
};
/* TODO RENAME THIS MIDDLEWARE AND IMPLEMENT IT PROPERLY */
module.exports = passFeedbackToView;