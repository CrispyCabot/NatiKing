const mongoose = require("mongoose");
const schema = require("./../schemas/post-schema");

const Posts = mongoose.model("post", schema);

module.exports = Posts;