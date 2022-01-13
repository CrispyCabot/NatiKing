const mongoose = require('mongoose');
const schema = require('./../schemas/user-schema');

const Users = mongoose.model('user', schema);

module.exports = Users;