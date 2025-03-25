
const Message = require("../Models/MessageModel");
const Conversation = require("../Models/ConversationsModel");

exports.sendMessage = async (req, res) => {
    try {
        const { messageBody } = req.body;
        const senderId = req.userDetails._id;
        const receiverId = req.params.receiverId;

        // Create new message
        const newMessage = new Message({
            senderId,
            receiverId,
            messageBody,
        });

        // Check if a conversation exists between sender and receiver
        let convo = await Conversation.findOne({ 
            participants: { $all: [senderId, receiverId] } 
        });

        if (!convo) {
            // Create a new conversation if it doesn't exist
            convo = new Conversation({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        convo.messages.push(newMessage._id);

        await Promise.all([newMessage.save(), convo.save()]);

        res.status(200).json({ success: true, messages: newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const  receiverId  = req.params.receiverId;
        const senderId=req.userDetails._id;
        const conversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } }).populate("messages");
        if(!conversation){
            return res.status(200).json({ success: false, message: [] });
        }
        const messages = conversation.messages;
        
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// deleting the messages and conversation between user

exports.DeleteMessages = async (req, res) => {
    try {
        const  receiverId  = req.params.receiverId;
        const senderId=req.userDetails._id;
        await Conversation.findOneAndDelete({ participants: { $all: [senderId, receiverId] } })
       
        await Message.deleteMany({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId } // Reverse condition
            ]
        });
        
       res.status(200).json({ success: true });
       
    } catch (error) {
        console.error("Error deleting  messages:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};