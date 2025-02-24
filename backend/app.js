const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const connect = require('./database');
const PORT=process.env.PORT || 5000;

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(cors());


app.use('/mingle/v1',require('./Routes/UserRoutes'))


connect()



const server=app.listen(PORT,()=>{
    console.log(`server is running on port: http://localhost:${PORT}`)
})