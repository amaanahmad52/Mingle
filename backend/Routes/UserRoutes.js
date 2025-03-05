const express=require('express')
const router = express.Router()
const { loginUser,registerUser, otpConfirm_and_login, otpSend ,otpSendbymail} = require('../Controllers/UserController')


router.route("/loginByEmail").post(loginUser)
router.route("/sendOtpByEmail").post(otpSendbymail)
router.route("/register").post(registerUser)
router.route("/loginByPhone").post(otpSend)
router.route("/otpConfirm").post(otpConfirm_and_login)




module.exports=router