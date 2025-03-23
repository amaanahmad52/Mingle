const User=require('../Models/UserModel');
const OTP=require('../Models/OTPModel');
const bcrypt = require('bcrypt');
const { setToken } = require('../Utils/TokenGenerateJWT');
const {sendSMS}=require('../Utils/Twilio')
const mailSender=require("../Utils/mailsender")
const cloudinary=require("../Utils/cloudinary")

// 1 login by email password

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

///verify phone number 
exports.verifyPhoneNumber = async (req, res) => {
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
        await User.findOneAndUpdate
        (
            { phoneNumber },
            { isPhoneVerified: true },
            { new: true }
        );
     res.status(200).json({ success: true, message: "Phone Number Verified" });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }




}

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
        // console.log(error);
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    
    }
    
    
    
}
exports.registerUser=async(req,res)=>{
    const {firstName,lastName,email,phoneNumber,password,confirmPassword,otp}=req.body;
    
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
        console.log("email222",email,firstName,lastName,phoneNumber,new_password)
        try {
            const user = await User.create({
                firstname:firstName,
                lastname:lastName,
                email,
                phoneNumber:phoneNumber,
                password: new_password,
                avatar: { public_id: "sample", url: "https://i.pravatar.cc/200" }
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

//logout user

exports.logoutUser = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(Date.now()), // Expire immediately
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};


//getting details of a logged in user

exports.getUserDetails=async(req,res)=>{
    //details will be fethed by the request parameter. after logging/signing in it will be saved (id save) in req.userDetails in the authentication code file
    if (!req.userDetails) { //auth file se ayega
        return res.status(401).json({ error: "Unauthorized" });
    }
    
    const user = await User.findById(req.userDetails.id)
    
    res.status(200).json({
      success: true,
      user
    });
}
//get all the users present in db

exports.getAllUser=async(req,res)=>{
    //details will be fethed by the request parameter. after logging/signing in it will be saved (id save) in req.userDetails in the authentication code file
  
    
    const user = await User.find()
    
    res.status(200).json({
      success: true,
      user
    });
}

//adding friend 

exports.addFriend = async (req, res) => {
    const { id, email } = req.body;
 
    try {
        const user1 = await User.findOne({
            email: email,
            
            friends: { $in: [id] } // Checks if ID exists in friends array
        });
        
        if(user1){
            return res.status(200).json({ success: false, message: "Already a friend" });
        }

        const user = await User.findOneAndUpdate(
            { email: email },
            { $addToSet: { friends:id } }, // Allows duplicates
            { new: true }
        )
console.log("user",user)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
     

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};



//update profile
exports.NameAboutUpdate = async (req, res, next) => {
    try {
        if (!req.userDetails) {
            return res.status(401).json({ error: "Unauthorized: User details missing" });
        }

        const newUserData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            about: req.body.about
        };

        // console.log("Updating User:", req.userDetails._id);


        const user = await User.findByIdAndUpdate(req.userDetails._id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Update Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//update profile picture
exports.UpdateProfilePic = async (req, res, next) => {
    try {
        if (!req.userDetails) {
            return res.status(401).json({ error: "Unauthorized: User details missing" });
        }

        // Find user
        const userFind = await User.findById(req.userDetails.id);
        if (!userFind) {
            return res.status(404).json({ error: "User not found" });
        }

        const imageId = userFind.avatar?.public_id || "sample";
        const newUserData = {};

        // Delete old image from Cloudinary if it's not the default
        if (imageId !== "sample") {
            try {
                await cloudinary.uploader.destroy(imageId);
            } catch (cloudError) {
                console.error("Cloudinary Deletion Error:", cloudError);
            }
        }

        // If no new avatar is provided, reset to default image
        if (!req.body.avatar) {
            newUserData.avatar = {
                public_id: "sample",
                url: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
            };
        } else {
            // Ensure the image is a valid Base64 string
            if (!req.body.avatar.startsWith("data:image")) {
                return res.status(400).json({ error: "Invalid image format. Must be Base64." });
            }

            // Upload new image to Cloudinary
            const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
                folder: "MingleAvatars",
                width: 150,
                crop: "scale",
            });

            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        // Update user in DB
        const user = await User.findByIdAndUpdate(req.userDetails.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



//send sms by twilio
exports.sendSMS = async (req, res) => {
    const { phoneNumber, message } = req.body;

    try {
        const response =sendSMS(phoneNumber, message);
        res.status(200).json({ success: true, message: "SMS sent successfully", response });
    } catch (error) {
        console.error("Error sending SMS:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};