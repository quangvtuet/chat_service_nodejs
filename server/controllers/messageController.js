import asyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

//@description     Get all Messages
//@route           GET /api/Message/:chatId?offset=0&limit=10
//@access          Protected
export const allMessages = asyncHandler(async (req, res) => {
  try {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;
    if (!offset || offset < 0 || !limit || limit < 0) {
      return res.status(400).send({
          error: 'invalid value for offset or limit'
      });
    }
    const messages = await Message.find({ chat: req.params.chatId })
      .skip(offset)
      .limit(limit)
      .populate("sender", "name pic email")
      .populate("chat")
      .sort({ updatedAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
export const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId , messageType} = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
    messageType: messageType,
  }

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "userName image");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

