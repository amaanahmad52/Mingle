
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

        res.status(200).json({ success: true, message: newMessage, conversation: convo });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
