const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settings_schema = new Schema({
    _id: { type: Schema.ObjectId, auto: true },
    primaryColor: String,
}, { strict: false });

module.exports = settings_schema;