exports.setToken = async(userdetails, statusCode, res)=> { //saves token in cookie
    const token = await userdetails.getJWTTOKEN(); //function defined in usermodel
    const options = {
      expires: new Date(Date.now() + 86400000), 
      httpOnly: true,
      secure: false 
    };
    
    return res.status(statusCode).cookie("token", token, options).json({  //express method to set cookie res.cookie
      success: true,
      userdetails,
      token
      
  })};
    
// module.exports=getToken