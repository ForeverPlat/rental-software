import crypto from "crypto";
import { createError } from "./createError.js";
import Invitation from "../Models/Invitation.js";

export const validateInvite = async (inviteToken, email) => {
  const tokenHash = crypto
    .createHash("sha256")
    .update(inviteToken)
    .digest("hex");

  const invite = await Invitation.findOne({
    tokenHash,
    status: "pending",
  });

  if (!invite) {
    throw createError("Invalid invite.", 400);
  }

  if (invite.expiresAt < new Date()) {
    throw createError("Invite expired.", 400);
  }

  if (invite.email !== email) {
    throw createError("Email must match invited email.", 400);
  }

  return invite;
};
