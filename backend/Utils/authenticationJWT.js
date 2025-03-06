const jwt=require('jsonwebtoken');
const User=require('../Models/UserModel')
const dotenv=require('dotenv');
dotenv.config();
const cookies=require('cookie-parser') //npm package used to get cookie value

//it is authentication chaecking middleware
exports.authenticationCheck = async (req, res, next) => {
    try {
      
        
       
        const { token } = req.cookies;  
        // console.log(token);
        
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch user details and attach to request
        req.userDetails = await User.findById(userId);
        
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};
