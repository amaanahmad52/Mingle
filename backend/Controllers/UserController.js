const User=require('../Models/UserModel');
const OTP=require('../Models/OTPModel');
const bcrypt = require('bcrypt');
const { setToken } = require('../Utils/TokenGenerateJWT');
const {sendSMS}=require('../Utils/Twilio')
<<<<<<< HEAD
const mailSender = require("../Utils/mailsender"); // Adjust the path if needed

const {emailTemplate}=require('../Utils/emailverificationtemplate')

//
=======
const mailSender=require("../Utils/mailsender")

// 1 login by email password
>>>>>>> upstream/main

exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const user = await User.findOne({ email }).select("+password");
        if(!user){
            return res.status(400).json({success:false,message:"User Not Found"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.status(400).json({success:false,message:"Invalid Credentials"})
        }

        setToken(user,200,res)

        
    }
    catch(error){
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    }
}


// 2 login by phone
//AND
//send the otp to phone
exports.otpSend=async(req,res)=>{
    
    const{phoneNumber}=req.body

    try {
        // Check if the user exists
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ success: false, message: "Some Error Occurred" });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string

        
        const existingOTP = await OTP.findOne({ phoneNumber });

        if (existingOTP) {
           
            await OTP.findOneAndUpdate(
                { phoneNumber },
                { $push: { otp: otp } }
            );
        } 
        else {
            // Create new OTP entry with a 5-minute expiration
            await OTP.create({
                phoneNumber,
                otp: [otp], // Store OTP in an array
                expiresAt: new Date(Date.now() + 5 * 60 * 1000) // Set expiration only on first OTP
            });
        }

       
        sendSMS(phoneNumber, otp); 

        res.json({ success: true,phoneNumber, message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    
    }
    
    
    
}

//send the otp to email

exports.otpSendbymail=async(req,res)=>{
    
    const{email,phoneNumber}=req.body

    try {
        // Check if the user exists
      

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string

        
        const existingOTP = await OTP.findOne({ email });

        if (existingOTP) {
           
            await OTP.findOneAndUpdate(
                { email },
                { $push: { otp: otp } }
            );
        } 
        else {
            // Create new OTP entry with a 5-minute expiration
            await OTP.create({
                email,
                
                otp: [otp], // Store OTP in an array
                expiresAt: new Date(Date.now() + 5 * 60 * 1000) // Set expiration only on first OTP
            });
            console.log("sssssss",otp);
        }

       
      //  sendSMSbyemail(email, otp);
      console.log("this is: ",email,otp);

      try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			`your otp for verification is : ${otp}`,
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}

        res.json({ success: true,email,otp, message: "OTP sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    
    }
    
    
    
}
exports.otpConfirm_and_login = async (req, res) => {
    const { userOtp, phoneNumber } = req.body;

    try {
        // Find user by phone number
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Find OTP entry
        const otpEntry = await OTP.findOne({ phoneNumber });

        // Check if OTP exists
        if (!otpEntry || otpEntry.otp.length === 0) {
            return res.status(400).json({ success: false, message: "No OTP found" });
        }

        // Get the most recent (last) OTP
        const lastOtp = otpEntry.otp[otpEntry.otp.length - 1];

        // Validate only the last OTP
        if (lastOtp !== userOtp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

       
        await OTP.deleteOne(
            { phoneNumber }
        );

        // Set authentication token
        setToken(user, 200, res);

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};


// controller for sending otp by mail and verify;


//3 sign Up user

exports.otpSendbymail=async(req,res)=>{
    
    const{email,phoneNumber}=req.body

    try {
       
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string

        
        const existingOTP = await OTP.findOne({ email });

        if (existingOTP) {
           
            await OTP.findOneAndUpdate(
                { email },
                { $push: { otp: otp } }
            );
        } 
        else {
            // Create new OTP entry with a 5-minute expiration
            await OTP.create({
                email,
                
                otp: [otp], // Store OTP in an array
                expiresAt: new Date(Date.now() + 5 * 60 * 1000) // Set expiration only on first OTP
            });
           
        }

       
      //  sendSMSbyemail(email, otp);
    //   console.log("this is: ",email,otp);

      try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			`your otp for verification is : ${otp}`,
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}

        res.json({ success: true,email,otp, message: "OTP sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    
    }
    
    
    
}
exports.registerUser=async(req,res)=>{
    const {firstname,lastname,email,phoneNumber,password,confirmPassword,otp}=req.body;
    
    //cloudinary will be added here , which will give avatar object things
    
    try {
       console.log("email",email)
        
        const user_already_exists=await User.findOne({email});
        
        if(user_already_exists){
            return res.status(401).json({message:"User already exists"})
        } 

        const otpEntry = await OTP.findOne({ email });
        console.log("email111",email)
        // Check if OTP exists
        if (!otpEntry || otpEntry.otp.length === 0) {
            return res.status(400).json({ success: false, message: "No OTP found" });
        }
           
        // Get the most recent (last) OTP
        const lastOtp = otpEntry.otp[otpEntry.otp.length - 1];

        // Validate only the last OTP
        if (lastOtp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        console.log("email222",email)
        const new_password= await bcrypt.hash(password, 10);   
        console.log("email222",email)
        try {
            const user = await User.create({
                firstname,
                lastname,
                email,
                phoneNumber:phoneNumber,
                password: new_password,
                avatar: { public_id: "sample", url: "sample" }
            });
        
            console.log("User created successfully:", user);
            setToken(user,200,res)
        } catch (error) {
            console.error("Error creating user:", error);
        }
        console.log("email333",email)
       // setToken(User,200,res)
        
    } 
    catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    }
    
}



//getting details of a logged in user

exports.getUserDetails=async(req,res)=>{
    //details will be fethed by the request parameter. after logging/signing in it will be saved (id save) in req.userDetails in the authentication code file
    if (!req.userDetails) { //auth file se ayega
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    const user = await User.findById(req.userDetails.id);
    
    res.status(200).json({
      success: true,
      user
    });
}
