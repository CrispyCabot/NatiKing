const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user_schema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    email: String,
    password: String,
    is_admin_user: Boolean,
    name: String,
    access_level: Number,
    socials: [{ url: String }],
}, { strict: false });

module.exports = user_schema;