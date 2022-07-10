import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      uniqe: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    userPic: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);