const mongoose=require('mongoose')
const validator = require('validator');
const dotenv=require('dotenv');
dotenv.config();
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    firstname:{
        type: String,
       // required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    lastname:{
        type: String,
      // required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
       minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
       // unique: true,
       // validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
       // required: [true, "Please Enter Your Password"],
        //minLength: [8, "Password should be greater than 8 characters"],
        select: false, 
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    phoneNumber: {
        type:String,
        required: [true, "Please Enter Your Phone Number"],
        // unique: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    }
})

userSchema.methods.getJWTTOKEN=async function(){  
   
    try {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
      });
  } catch (error) {
      console.error({message:error.message});
      throw error; 
  }
}


module.exports=mongoose.model("User",userSchema)