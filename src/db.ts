import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const userModel = model("user", userSchema);

export { userModel };
