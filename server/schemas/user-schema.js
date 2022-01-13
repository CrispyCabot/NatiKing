const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user_schema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  first_name: String,
  last_name: String
}, {strict: false})

module.exports = user_schema;