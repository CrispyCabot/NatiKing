const router = require("express").Router();

//User getters
const Users = require("../models/user-model");
router.route("/users").get((req, res) => {
    Users.find({}, async(err, response) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(response);
    });
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
    });
});

module.exports = router;