const express=require('express')
const router = express.Router()
<<<<<<< HEAD
const { loginUser,registerUser, otpConfirm_and_login, otpSend ,otpSendbymail} = require('../Controllers/UserController')


router.route("/loginByEmail").post(loginUser)
router.route("/sendOtpByEmail").post(otpSendbymail)
=======
const { loginUser,registerUser, otpConfirm_and_login, otpSend, getUserDetails, otpSendbymail } = require('../Controllers/UserController')
const { authenticationCheck } = require('../Utils/authenticationJWT')

//routes for new/existing user for entry
router.route("/login").post(loginUser)
>>>>>>> upstream/main
router.route("/register").post(registerUser)
router.route("/loginByPhone").post(otpSend)
router.route("/otpConfirm").post(otpConfirm_and_login)
router.route("/sendOtpByEmail").post(otpSendbymail)
router.route("/register").post(registerUser)

//routes for an authenticated user
router.route("/me").get(authenticationCheck,getUserDetails);



module.exports=router