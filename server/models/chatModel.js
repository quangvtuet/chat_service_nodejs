import { mongoose, model, Schema } from "mongoose";

const chatModel = new Schema(
  {
    chatName: { type: String, trim: true },
    profileId: { type: String, trim: true },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    // TODO group chat se them sau
    // isGroupChat: { type: Boolean, default: false },
    // groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default model("Chat", chatModel);