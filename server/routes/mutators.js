const router = require("express").Router();
const bcrypt = require('bcryptjs');
const authChecker = require("./utils/auth-checker");
const gameScoreCalculation = require("./utils/game-score-calculation");
const sendNotification = require("./utils/send-notification");
const deleteNotification = require('./utils/delete-notification');
const defaultStats = require('./utils/default-stats');

module.exports = router