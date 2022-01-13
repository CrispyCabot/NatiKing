const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createAccessToken, createJRTEM, sendRefreshToken } = require('./utils/authorization');
const sendNotification = require('./utils/send-notification');
const deleteNotification = require('./utils/delete-notification');
const authChecker = require("./utils/auth-checker");
const defaultStats = require('./utils/default-stats');


// Auth Setters
router.route('/refresh_token').post((req, res) => {
  const token = req.cookies.jrtem
  if (!token) return res.send({ ok: false, accessToken: '' })

  let decodedPayload = null;
  try {
    decodedPayload = jwt.verify(token, process.env.JRTEM_KEY)
  } catch(err) {
    return res.send({ ok: false, accessToken: '' })
  }
  
  Players.findOne({_id: decodedPayload.userId}).then(user => {
    if (!user || user.token_version !== decodedPayload.tokenVersion) return res.send({ ok: false, accessToken: '' });
    sendRefreshToken(req, res, createJRTEM(user))
    res.send({ ok: true, accessToken: createAccessToken(user), user: user })
  })
})

module.exports = router