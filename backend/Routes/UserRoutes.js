const express=require('express')
const router = express.Router()
const { loginUser,registerUser, otpConfirm_and_login, otpSend, getUserDetails } = require('../Controllers/UserController')
const { authenticationCheck } = require('../Utils/authenticationJWT')

//routes for new/existing user for entry
router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/loginByPhone").post(otpSend)
router.route("/otpConfirm").post(otpConfirm_and_login)

//routes for an authenticated user
router.route("/me").get(authenticationCheck,getUserDetails);



module.exports=router