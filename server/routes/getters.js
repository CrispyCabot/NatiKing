const router = require("express").Router();

const Users = require('../models/user-model')
router.route('/users').get((req, res) => {
  Users.find({}, async (err, response) => {
    if (err) {
      console.log(err)
      return
    }
    res.json(response)
  })
})

module.exports = router