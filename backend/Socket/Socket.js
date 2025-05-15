
const express=require('express');
const app=express();

//we need to acees the server`s instance to use socket
const http = require('http');
const httpserver = http.createServer(app);


//socket functionality......................................................
//socket server on top of express_server
const { Server } = require('socket.io');
const io = new Server(httpserver,{
    cors: {
        origin:"*",
        credentials:true,            //access-control-allow-credentials:true
        methods:["GET","POST"]
        
    }
});

//map for online users
const userSocketMap = {}

io.on('connection', (socket) => {
  console.log('a user connected',socket.id);

  const userId = socket.handshake.query.userId;
  if(userId!='undefined')userSocketMap[userId] = socket.id;
  //give this map to all clients
  io.emit('onlineUsers',Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    //clean user from map
    delete userSocketMap[userId];
    io.emit('onlineUsers',Object.keys(userSocketMap));
    console.log('user disconnected',socket.id);
  }); 
});

//send this map to controllers for messaging
const getUserSocketMap = (receiverId) => {
    return userSocketMap[receiverId];
}



module.exports={ app, io, httpserver,getUserSocketMap }