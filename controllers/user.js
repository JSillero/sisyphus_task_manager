const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.js");

// PROFILE PAGE
router.get('/profile', (req, res) => {
    return res.render('user/profile.ejs');
})

//CHANGE VALUES OF USER
router.get('/change/username', (req, res) => {
    return res.render(`user/changeusername.ejs`);
})

router.put('/change/username', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.session.user._id, req.body);
        req.session.user = {
            username: req.body.username,
            _id: req.session.user._id
        };
        return res.redirect(`/user/profile?feedback=Username changed succesfully to: ${req.body.username}`);
    } catch (error) {
        return res.render(`user/changeusername.ejs`, { error: error.errors });
    }

})

router.get('/change/password', (req, res) => {
    return res.render(`user/changepassword.ejs`);
})
router.put('/change/password', async (req, res) => {

    try {
        if (req.body.password = req.body.confirmpassword) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashedPassword;
            let user = await User.findByIdAndUpdate(req.session.user._id, req.body);
            return res.redirect(`/user/profile?feedback=Password changed sucessfully!`);
        } else {
            return res.render(`user/changeusername.ejs`, { error: "Passwords not equal." });
        }
    } catch (error) {
        return res.render(`user/changeusername.ejs`, { error: error });
    }

})

router.get('/change/email', (req, res) => {
    return res.render(`user/changeemail.ejs`);
})

router.put('/change/email', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.session.user._id, req.body);
        return res.redirect(`/user/profile?feedback=Email changed succesfully to: ${req.body.email}`);
    } catch (error) {
        return res.render(`user/changeusername.ejs`, { error: error.errors });
    }
})


module.exports = router;