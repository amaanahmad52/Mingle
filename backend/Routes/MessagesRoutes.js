const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../Controllers/MessagesController"); // Use require instead of import
const { authenticationCheck } = require("../Utils/authenticationJWT");

router.route("/sendMessage/:receiverId").post(authenticationCheck, sendMessage);
router.route("/getMessages/:receiverId").get(authenticationCheck, getMessages);

module.exports = router;
