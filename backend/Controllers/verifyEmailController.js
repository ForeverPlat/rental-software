import Invitation from "../Models/Invitation.js";
import User from "../Models/User.js";
import { createError } from "../utils/createError.js";

export const verifyEmailController = async (req, res, next) => {
  try {
    const { userId, verificationToken } = req.query;

    const user = await User.findOne({
      _id: userId,
      verificationToken,
    });

    if (!user) {
      return next(createError("Invalid or expired verification link.", 400));
    }

    if (
      user.verificationTokenExpires &&
      user.verificationTokenExpires < Date.now()
    ) {
      return next(createError("Verification link has expired.", 400));
    }

    if (user.verified) {
      return res.status(200).json({
        message: "Email already verified.",
      });
    }

    user.verified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    // finalize invite if present
    if (user.pendingInvitation) {
      const invite = await Invitation.findById(user.pendingInvitation);

      if (
        invite &&
        invite.status === "pending" &&
        invite.email === user.email &&
        invite.expiresAt > new Date()
      ) {
        if (user.company) {
          return next(createError("User already belongs to a company.", 400));
        }

        user.company = invite.company;
        user.role = invite.role;

        invite.status = "accepted";
        invite.acceptedAt = new Date();
        invite.acceptedBy = user._id;

        await invite.save();
      }

      user.pendingInvitation = null;
    }

    await user.save();

    res.status(200).json({
      message: "Email verified successfully!",
    });
  } catch (error) {
    next(error);
  }
};

