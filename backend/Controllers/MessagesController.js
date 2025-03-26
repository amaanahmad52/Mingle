
const Message = require("../Models/MessageModel");
const Conversation = require("../Models/ConversationsModel");
const User=require("../Models/UserModel");

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
            return res.status(200).json({ success: false, messages: [] });
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
//deleting multiple messages
exports.DeleteManyMessages=async (req, res) => {
    try {
        const { receiverId, messageIds } = req.body;
        const senderId=req.userDetails._id;
        if (!messageIds || messageIds.length === 0) {
            return res.status(400).json({ success: false, message: "No messages to delete" });
        }

        // Delete all messages where the ID is in the array and matches the receiverId
        await Conversation.updateMany(
            { participants: { $all: [receiverId, senderId] } },
            { $pull: { messages: { $in: messageIds } } }
        );

        // ✅ Step 2: Delete Messages from Message Collection/////
        await Message.deleteMany({ _id: { $in: messageIds } });

        res.status(200).json({
            success: true,
            message: " messages deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

//checking if converation between one user and another array of users exists or not 


exports.checkConversation = async (req, res) => {
    try {
        const senderId = req.userDetails._id;
        const { receiverUsers } = req.body; // Expecting an array

        // ✅ Check if receiverUsers is undefined or empty
        if (!receiverUsers || !Array.isArray(receiverUsers) || receiverUsers.length === 0) {
            return res.status(400).json({ success: false, message: "receiverUsers array is required" });
        }

        const nonFriends = [];

        for (let i = 0; i < receiverUsers.length; i++) {
            const receiverId = receiverUsers[i]; // Ensure it's an ID, not an object
            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] }
            });

            if (conversation) {
                nonFriends.push(receiverId);    
            }
        }

        res.status(200).json({ success: true, nonFriends });

    } catch (error) {
        console.error("Error checking conversation:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
