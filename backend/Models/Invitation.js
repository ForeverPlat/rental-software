import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tokenHash: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "revoked", "expired"],
      default: "pending",
    },

    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    acceptedAt: Date,

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    accepted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.model("Invitation", invitationSchema);
