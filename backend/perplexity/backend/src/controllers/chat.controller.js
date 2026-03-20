import modelresponser, { titleGenerator } from "../services/ai.service.js";
import Chatmodel from "../models/chat.model.js";
import messagemodel from "../models/message.model.js";
export const sendMessage = async (req, res) => {
    const { message, chat: chatID } = req.body;



    let title = null; let dbchatmodel = null;

    if (!chatID) {
        title = await titleGenerator(message)
        console.log(title)
        dbchatmodel = await Chatmodel.create({
            user: req.user.id,
            title: title
        })
    }

    const targetChatID = chatID || dbchatmodel?._id;

    const userresponse = await messagemodel.create({
        chat: targetChatID,
        role: "user",
        content: message
    })

    const finalhistorymessage = await messagemodel.find({ chat: targetChatID })


    const response = await modelresponser(finalhistorymessage);
    console.log(response)

    const airesponse = await messagemodel.create({
        chat: targetChatID,
        role: "ai",
        content: JSON.stringify(response)
    })



    res.json({
        title: title,
        user: userresponse,
        ai: airesponse,
        success: true,
    })
}

export const getChats = async (req, res) => {
    const id = req.user.id
    const chats = await Chatmodel.find({user:id});
    res.json({
        chats,
        success: true,
    })
}

export async function getMessages(req, res) {
    const chatId  = req.params.id;

    const chat = await Chatmodel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messagemodel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

export async function deleteChat(req, res) {
    const id = req.params.id;

    const chat = await Chatmodel.findOne({
        _id: id,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    await Chatmodel.deleteOne({
        _id: id,
        user: req.user.id
    })
    await messagemodel.deleteMany({
        chat: id
    })

    res.status(200).json({
        message: "Chat deleted successfully"
    })
}
