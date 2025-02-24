const mongoose=require('mongoose')
const dotenv=require('dotenv');
dotenv.config();

const connect=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to Database")
    }
    catch(err){
        console.log(err)
    }
       
}

module.exports=connect