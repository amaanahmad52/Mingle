const express=require('express')
const router = express.Router()
const { loginUser,registerUser, otpConfirm_and_login, otpSend } = require('../Controllers/UserController')


router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/loginByPhone").post(otpSend)
router.route("/otpConfirm").post(otpConfirm_and_login)




module.exports=router