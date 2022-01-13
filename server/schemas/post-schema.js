const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post_schema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    owner_id: Schema.Types.ObjectId,
    title: String,
    description: String,
    likes: [Schema.Types.ObjectId], //user ids
    tags: [String],
    comments: [{ user_id: Schema.Types.ObjectId, comment: String }], //comment ids
}, { strict: false });

module.exports = post_schema;