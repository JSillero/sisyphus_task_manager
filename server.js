const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const MongoStore = require("connect-mongo");
const methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');



require('dotenv/config')

// ! -- Variables
const app = express()
const port = 3000
const authController = require("./controllers/auth.js");
const taskController = require("./controllers/task.js");
const userController = require("./controllers/user.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const passFeedbackToView = require("./middleware/pass-feedback-to-view.js");
const isLogged = require("./middleware/is-logged.js");


// ! -- Middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'));
app.use(flash());
// Set direction for styles
//app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static("public"));


//session manager
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);


//adds the user session to all views
app.use(passUserToView);
//adds a feedback message display that indicates errors or succesfull actions
app.use(passFeedbackToView);


app.get('/', (req, res) => {
    res.render('index.ejs', { feedback: req.flash('feedback'), error: req.flash('error') });
});

app.get('/unauthorised', (req, res) => {
    res.render('not-authorised.ejs');
});

//Controller
app.use("/auth", authController);

/* app.use(isLogged); */

app.use("/tasks", isLogged, taskController);
app.use("/user", isLogged, userController);

// Start the Express server
const startServers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection established");

        app.listen(port, () => {
            console.log(`🚀 Express api lab on ${port}`)
        })

    } catch (error) {
        console.log(error);
    }
}
startServers();