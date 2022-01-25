const mongoose = require("mongoose");
const schema = require("./../schemas/settings-schema");

const Settings = mongoose.model("settings", schema);

module.exports = Settings;