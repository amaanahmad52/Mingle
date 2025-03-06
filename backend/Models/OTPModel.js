const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const OTPSchema = new mongoose.Schema({
  
    email: {
        type: String,
<<<<<<< HEAD
       required:true,
        unique: true,
=======
        // unique: true,
    },
    email: {
        type: String,
        // unique: true,
>>>>>>> upstream/main
    },
    otp: [{
        type: String,
        required: [true, "Please Enter Your OTP"],
    }],
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
        expires: 0 // TTL index (MongoDB will delete the document when expired)
    }
});

module.exports = mongoose.model("OTP", OTPSchema);
