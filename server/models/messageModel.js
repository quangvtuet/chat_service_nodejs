import { mongoose, model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messageType: {
      type: String,
      enum: ['image', 'text', 'file'],
    },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

export default model("Message", messageSchema);