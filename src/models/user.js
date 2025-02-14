import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatarURL: { type: String },
});

export default mongoose.model("Users", userSchema);
