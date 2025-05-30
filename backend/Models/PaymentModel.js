const mongoose=require('mongoose')


const paymentSchema=new mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    

},
{timestamps: true }
);


module.exports=mongoose.model("PaymentModel",paymentSchema)