const express = require("express");
const { authenticationCheck } = require("../Utils/authenticationJWT");
const { createOrder, verifyPayment, getKey, getPaymentHistory, addBalance } = require("../Controllers/PaymentControlller");
const router = express.Router();


router.route("/createOrder").post(authenticationCheck,createOrder);
router.route("/verifyPayment/:receiverId").post(authenticationCheck,verifyPayment);
router.route("/getPaymentHistory").get(authenticationCheck,getPaymentHistory);
router.route("/addBalance").put(authenticationCheck,addBalance);

router.route("/getKey").get(authenticationCheck,getKey);

module.exports = router;