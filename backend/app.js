const express=require('express');
const {app,httpserver}=require('./Socket/Socket')
const bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config();
const connect = require('./database');
const PORT=process.env.PORT || 5000;

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.json());
app.use(cookieParser());


app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
        
    }

));


app.use('/mingle/v1',require('./Routes/UserRoutes'))
app.use('/mingle/v1',require('./Routes/MessagesRoutes'))
app.use('/mingle/v1',require('./Routes/PaymentRoute'))

connect()


//send this map to controllers for messaging


httpserver.listen(PORT,()=>{
    console.log(`server is running on port: http://localhost:${PORT}`)
})