import Invitation from "../Models/Invitation.js";
import User from "../Models/User.js";
import { createError } from "../utils/createError.js";
import { sendInvitationEmail } from "../utils/sendInvitationEmail.js";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return next(createError("Unauthorized.", 401));
    }

    const user = await User.findById(userId).select(
      "-password -verificationToken -verificationTokenExpires",
    );

    if (!user) {
      return next(createError("User not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "User was found.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return next(createError("Unauthorized.", 401));
    }

    const { username, email } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { username }, // later add update email as well
      { new: true },
    ).select("-password -verificationToken -verificationTokenExpires");

    if (!user) {
      return next(createError("User not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "User was updated.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return next(createError("Unauthorized.", 401));
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return next(createError("All fields must be filled", 400));
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return next(createError("User not found.", 404));
    }

    const isCorrectPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isCorrectPassword) {
      return next(createError("Incorrect Password.", 400));
    }

    if (currentPassword === newPassword) {
      return next(
        createError(
          "New password cannot be the same as the old password.",
          400,
        ),
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true },
    ).select("-password -verificationToken -verificationTokenExpires");

    res.status(200).json({
      success: true,
      message: "User password was updated.",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const inviteUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { email, role = "user" } = req.body;

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findById(userId).populate("company");

    if (!user) return next(createError("User not found.", 404));
    if (!user.company) return next(createError("User has no company.", 400));

    const isOwner = user.company.owner.toString() === user._id.toString();
    const canInvite = isOwner || user.role === "admin";

    if (!canInvite) {
      return next(createError("Unauthorized to send invites.", 403));
    }

    if (normalizedEmail === user.email) {
      return next(createError("You cannot invite yourself.", 400));
    }

    const existingMember = await User.findOne({
      email: normalizedEmail,
      company: user.company._id,
    });

    if (existingMember) {
      return next(createError("User already belongs to this company.", 400));
    }

    const existingInvite = await Invitation.findOne({
      email: normalizedEmail,
      company: user.company._id,
      status: "pending",
      expiresAt: { $gt: new Date() },
    });

    if (existingInvite) {
      return next(createError("Active invite already exists.", 400));
    }

    const rawToken = crypto.randomBytes(32).toString("hex");

    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    const invite = await Invitation.create({
      email: normalizedEmail,
      company: user.company._id,
      role,
      invitedBy: user._id,
      tokenHash,
      expiresAt,
    });

    // cant remember
    invite.save();

    await sendInvitationEmail({
      user: user.username,
      company: user.company.name,
      email: normalizedEmail,
      token: rawToken,
    });

    res.status(200).json({
      success: true,
      message: "Invite sent.",
    });
  } catch (error) {
    next(error);
  }
};

export const validateInvite = async (req, res, next) => {
  try {
    const { inviteToken } = req.params;

    const tokenHash = crypto
      .createHash("sha256")
      .update(inviteToken)
      .digest("hex");

    const invite = await Invitation.findOne({
      tokenHash,
      status: "pending",
    }).populate("company");

    if (!invite) {
      return next(createError("Invalid invite.", 400));
    }

    if (invite.expiresAt < new Date()) {
      return next(createError("Invite expired.", 400));
    }

    res.status(200).json({
      success: true,
      data: {
        email: invite.email,
        company: invite.company.name,
        role: invite.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
// export const acceptInvite = async (req, res, next) => {
//   try {
//     const { inviteToken } = req.params;
//
//     const invite = await Invitation.findOne({
//       token: inviteToken,
//     }).populate("company");
//
//     if (!invite) {
//       return next(createError("Invalid invite token.", 400));
//     }
//
//     if (invite.expiresAt < new Date()) {
//       return next(createError("Invite has expired.", 400));
//     }
//
//     if (invite.accepted) {
//       return next(createError("This invite has already been used.", 400));
//     }
//
//     res.status(200).json({
//       success: true,
//       message: "Invite sent.",
//       data: {
//         email: invite.email,
//         company: invite.company.name,
//         role: invite.role,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };
