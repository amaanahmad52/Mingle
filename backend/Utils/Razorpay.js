const dotenv=require('dotenv');
dotenv.config();
const Razorpay=require('razorpay')

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_key_id,
    key_secret: process.env.RAZORPAY_key_secret,
});

module.exports=instance