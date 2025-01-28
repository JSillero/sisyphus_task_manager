const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.js");

//                          LOG IN
router.post("/log-in", async (req, res) => {

    // First, get the user from the database
    console.log(req.body.username);
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
        req.flash('error', 'User not found, try again.');
        return res.redirect("/");
    }

    // There is a user! Time to test their password with bcrypt
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    );
    console.log(req.body.password + "_ _" + userInDatabase.password);
    if (!validPassword) {
        req.flash('error', 'Invalid password.');
        return res.redirect("/");

    }

    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
    };
    res.redirect("/");
})


//                                     SIGN  UP
router.get("/sign-up", async (req, res) => {
    res.render("auth/sign-up.ejs", { error: req.flash('error'), feedback: req.flash('feedback') })
});
router.post("/sign-up", async (req, res) => {

    if (req.body.password !== req.body.confirmPassword) {
        req.flash('feedback', 'Password and Confirm Password must match.');
        res.render("auth/sign-up.ejs", { error: req.flash('error'), feedback: req.flash('feedback') })

    }

    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
        req.flash('feedback', 'Username already taken.');
        res.render("auth/sign-up.ejs", { error: req.flash('error'), feedback: req.flash('feedback') })

    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    // validation logic
    try {
        const user = await User.create(req.body);
        req.flash('feedback', `Thanks for signing up ${user.username}`);
        res.redirect("/");
    } catch (error) {
        console.dir(error);

        req.flash('feedback', (error.code == 11000 ? "Email already in use." : error._message));//11000 error code could be for any repeated field but in this case the name is managed before 
        res.render("auth/sign-up.ejs", { error: req.flash('error'), feedback: req.flash('feedback') })
    }

});

//                              LOG OUT 
router.get('/log-out', (req, res) => {
    // Destroy existing session
    req.session.destroy((err) => {
        if (err) {
            console.log(err)
            return res.status(500).send('<h1>An error occurred.</h1>')
        }
        return res.redirect('/')
    })
})

module.exports = router;