const express=require('express')
const router = express.Router()
const { loginUser,registerUser, otpConfirm_and_login, otpSend, getUserDetails,otpSendbymail, logoutUser, NameAboutUpdate, UpdateProfilePic, verifyPhoneNumber, sendSMS } = require('../Controllers/UserController')
const { authenticationCheck } = require('../Utils/authenticationJWT')
const { getAllUser } = require('../Controllers/UserController')    
const { addFriend } = require('../Controllers/UserController')
const { checkConversation } = require('../Controllers/MessagesController')

//routes for new/existing user for entry
router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/loginByPhone").post(otpSend)
router.route("/otpConfirm").post(otpConfirm_and_login)
router.route("/sendOtpByEmail").post(otpSendbymail)
router.route("/register").post(registerUser)
router.route("/logout").post(logoutUser)

//routes for an authenticated user
router.route("/me").get(authenticationCheck,getUserDetails);
router.route("/getalluser").get(getAllUser);
router.route("/addfriend").post(authenticationCheck,addFriend)
router.route("/nameAboutUpdate").put(authenticationCheck,NameAboutUpdate)
router.route("/updateProfilePic").put(authenticationCheck,UpdateProfilePic)
router.route("/verifyphone").post(verifyPhoneNumber)
router.route("/sendsms").post(sendSMS)
router.route("/requestNonFriends").post(authenticationCheck,checkConversation);


module.exports=router