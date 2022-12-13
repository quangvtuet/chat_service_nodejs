import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messageType: String(['image', 'text', 'file']),
    
  },
  { timestamps: true }
);

export default model("message", messageSchema);
