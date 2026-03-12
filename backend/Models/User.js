import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
      required: true,
    },

    verificationToken: String,
    verificationTokenExpires: Date,

    pendingInvitation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invitation",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);

