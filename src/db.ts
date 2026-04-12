import mongoose, { Schema, model, mongo } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const contentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
});

const userModel = model("user", userSchema);
const contentModel = model("content", contentSchema);

export { userModel, contentModel };
