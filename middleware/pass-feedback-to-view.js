const passFeedbackToView = (req, res, next) => {
    res.locals.feedback = req.session.feedback ? req.session.feedback : null;
    res.locals.error = req.session.error ? req.session.error : null;
    next();
};

module.exports = passFeedbackToView;