const User=require('../Models/UserModel');
const OTP=require('../Models/OTPModel');
const bcrypt = require('bcrypt');
const { setToken } = require('../Utils/TokenGenerateJWT');
const {sendSMS}=require('../Utils/Twilio')
const {mailSender} =require('../Utils/mailsender')
const {emailTemplate}=require('../Utils/emailverificationtemplate')

//

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
//login by phone

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
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
exports.otpSendbymail=async(req,res)=>{
    
    const{email}=req.body

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
        }

       
      //  sendSMSbyemail(email, otp);

      sendVerificationEmail(email,otp);

        res.json({ success: true,email, message: "OTP sent successfully" });
    } catch (error) {
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


exports.registerUser=async(req,res)=>{
    const {firstname,lastname,email,password,phoneNumber,otp}=req.body;
    
    //cloudinary will be added here , which will give avatar object things
    
    try {
       
        
        const user_already_exists=await User.findOne({email});
        
        if(user_already_exists){
            return res.status(401).json({message:"User already exists"})
        } 

        const otpEntry = await OTP.findOne({ email });

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

        const new_password= await bcrypt.hash(password, 10);   
   
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: new_password,  
            phoneNumber,
            avatar: { public_id: "sample", url: "sample" }
        });
        

        setToken(user,200,res)
        
    } 
    catch (error) {
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    }
    
}
