const router = require("express").Router();

//Settings getters
const Settings = require("../models/settings-model");
router.route("/colors").get((req, res) => {
    Settings.find({}, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    });
});

//User getters
const Users = require("../models/user-model");
router.route("/users").get((req, res) => {
    Users.find({}, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    }).sort({ access_level: -1 });
});
router.route("/users/:id").get((req, res) => {
    const { id } = req.params;
    Users.findOne({ _id: id }, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    });
});
router.route("/writers").get((req, res) => {
    Users.find({ access_level: { $gte: 10 } }, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    }).sort({ access_level: -1 });
});

//Posts getters
const Posts = require("../models/post-model");
router.route("/posts").get((req, res) => {
    Posts.find({}, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    }).sort({ date: -1 });
});
router.route("/posts/:tags").get((req, res) => {
    console.log(req.params);
    const { tags } = req.params;
    const tagsArray = tags.split(",");

    //tags: { $in: tagsArray }
    Posts.find({ tags: { $in: tagsArray } }, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    }).sort({ date: -1 });
});
router.route("/posts/:id").get((req, res) => {
    const { id } = req.params;
    Posts.findOne({ _id: id }, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    });
});

module.exports = router;