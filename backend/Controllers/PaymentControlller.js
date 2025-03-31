const PaymentModel=require('../Models/PaymentModel')
const instance=require('../Utils/Razorpay')
const dotenv=require('dotenv');
const crypto = require('crypto');
dotenv.config();
exports.createOrder=async(req,res)=>{
        const {amount}=req.body
    try{
        const options={
            amount: amount*100,
            currency: "INR",
            receipt: "order_rcptid_11"
        }
        const order=await instance.orders.create(options)
        res.status(200).json({success:true,order})
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error",error:error.message})    
    }
}

exports.verifyPayment=async(req,res)=>{
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body
    const {receiverId}=req.params;
    const senderId=req.userDetails._id;
    const amount=req.query.amount
    try{
        const secret = process.env.RAZORPAY_key_secret;
        const params = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', secret)
            .update(params)
            .digest('hex');
        if (razorpay_signature === expectedSignature) {
            // console.log("Payment verified");
            const payment=new PaymentModel({razorpay_payment_id,razorpay_order_id,razorpay_signature,senderId,receiverId,amount})
            await payment.save();
            const paymentId=payment._id
           res.redirect(`http://localhost:5173/paymentSuccess/${paymentId}`)
        }
        else{
            res.status(400).json({success:false,message:"Payment Failed"})
        }
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error",error:error.message})    
    }
}
   

exports.getKey=async(req,res)=>{
    try{
        res.status(200).json({success:true,key:process.env.RAZORPAY_key_id})
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error",error:error.message})    
    }
}