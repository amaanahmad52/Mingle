const express=require('express')
const router = express.Router()
const { loginUser,registerUser, otpConfirm_and_login, otpSend, getUserDetails,otpSendbymail, logoutUser, NameAboutUpdate, UpdateProfilePic } = require('../Controllers/UserController')
const { authenticationCheck } = require('../Utils/authenticationJWT')
const { getAllUser } = require('../Controllers/UserController')    
const { addFriend } = require('../Controllers/UserController')
//routes for new/existing user for entry
router.route("/login").post(loginUser)
router.route("/addfriend").post(addFriend)
router.route("/register").post(registerUser)
router.route("/loginByPhone").post(otpSend)
router.route("/otpConfirm").post(otpConfirm_and_login)
router.route("/sendOtpByEmail").post(otpSendbymail)
router.route("/register").post(registerUser)
router.route("/logout").post(logoutUser)

//routes for an authenticated user
router.route("/me").get(authenticationCheck,getUserDetails);
router.route("/getalluser").get(getAllUser);
router.route("/nameAboutUpdate").put(authenticationCheck,NameAboutUpdate)
router.route("/updateProfilePic").put(authenticationCheck,UpdateProfilePic)


module.exports=router