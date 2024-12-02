const express = require("express");
const router = express.Router();

const Task = require("../models/task.js");
const User = require("../models/user.js");

//define the objectId for mongoose 
const ObjectId = require('mongodb').ObjectId;

/* Read */
router.get("/", async (req, res) => {

    let tasks = await Task.find({ 'owner': ObjectId.createFromHexString(req.session.user._id) ,'status':'Active'});
    res.render("./tasks/task-list.ejs", { tasks: tasks, feedback: req.flash('feedback'), error: req.flash('error') });
})

router.get("/filter", async (req, res) => {

    let tasks = await Task.find({ 'owner': ObjectId.createFromHexString(req.session.user._id) });
    res.render("./tasks/task-filter.ejs", { tasks: tasks, feedback: req.flash('feedback'), error: req.flash('error') });
})

/* Create */
router.get("/new", (req, res) => {
    res.render("./tasks/task-form.ejs", { feedback: req.flash('feedback'), error: req.flash('error') });
})

router.post("/new", async (req, res) => {
    try {
        req.body.owner = req.session.user._id
        const task = await Task.create(req.body);
        req.flash('feedback', `${task.name} created!`);
        res.redirect("/tasks/new");
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/tasks/new`);
    }
});

/* Edit */
router.get("/:taskId/edit", async (req, res) => {
    let task = await Task.findById(req.params.taskId);
    res.render("./tasks/task-edit.ejs", { task: task, feedback: req.flash('feedback'), error: req.flash('error') });
})

router.put("/:taskId/edit", async (req, res) => {
    try {
        let task = await Task.findByIdAndUpdate(req.params.taskId, req.body);
        task = await Task.findById(req.params.taskId);
        req.flash('feedback', 'Task edited succesfully.');
        res.render(`/tasks/${req.params.taskId}/edit`);
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/tasks/${req.params.taskId}/edit`);
    }
})

//Complete task
router.put("/:taskId/complete", async (req, res) => {
    try {
        req.body.status = "Completed";
        let task = await Task.findByIdAndUpdate(req.params.taskId, req.body);
        req.flash('feedback', `${task.name} completed. Kudos!`);
        res.redirect(`/tasks`);
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/tasks`);
    }
})

//Delete task
router.delete("/:taskId/delete", async (req, res) => {

    try {
        let task = await Task.findByIdAndDelete(req.params.taskId);
        req.flash('feedback', `${task.name} deleted!`);
        res.redirect(`/tasks`);
    } catch (error) {
        req.flash('error', error.message);
        res.redirect(`/tasks`);
    }
})
module.exports = router;