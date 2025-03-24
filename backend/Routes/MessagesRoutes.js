const express = require("express");
const router = express.Router();
const { sendMessage } = require("../Controllers/MessagesController"); // Use require instead of import
const { authenticationCheck } = require("../Utils/authenticationJWT");

router.route("/sendMessage/:receiverId").post(authenticationCheck, sendMessage);

module.exports = router;
