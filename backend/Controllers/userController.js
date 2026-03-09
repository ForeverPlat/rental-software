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

    if (!userId) {
      return next(createError("Unauthorized.", 401));
    }

    const { email, role } = req.body;

    const user = await User.findById(userId).populate("company", "name");

    if (!user) {
      return next(createError("User not found.", 404));
    }

    if (!user.company) {
      return next(createError("This user does not have a company.", 404));
    }

    if (user.role !== "owner" && user.role !== "admin") {
      return next(createError("Unauthorized to send invites.", 401));
    }

    const inviteExists = await Invitation.exists({
      email,
      company: user.company._id,
      expiresAt: { $gt: new Date() },
    });

    if (inviteExists) {
      return next(createError("An active invite has already been sent.", 400));
    }

    const inviteToken = crypto.randomBytes(32).toString("hex");
    const inviteTokenExpires = new Date(
      Date.now() + 48 * 60 * 60 * 1000 + 5 * 60 * 1000,
    );

    const invite = new Invitation({
      email,
      role,
      company: user.company._id,
      token: inviteToken,
      expiresAt: inviteTokenExpires,
    });

    await invite.save();

    await sendInvitationEmail({
      user: user.username,
      company: user.company.name,
      email,
      token: inviteToken,
    });

    res.status(200).json({
      success: true,
      message: "Invite sent.",
      data: invite,
    });
  } catch (error) {
    next(error);
  }
};

export const validateInvite = async (req, res, next) => {
  try {
    const { inviteToken } = req.params;

    const invite = await Invitation.findOne({
      token: inviteToken,
    }).populate("company");

    if (!invite) {
      return next(createError("Invalid invite token.", 400));
    }

    if (invite.expiresAt < new Date()) {
      return next(createError("Invite has expired.", 400));
    }

    if (invite.accepted) {
      return next(createError("This invite has already been used.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Invite sent.",
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

export const acceptInvite = async (req, res, next) => {
  try {
    const { inviteToken } = req.params;

    const invite = await Invitation.findOne({
      token: inviteToken,
    }).populate("company");

    if (!invite) {
      return next(createError("Invalid invite token.", 400));
    }

    if (invite.expiresAt < new Date()) {
      return next(createError("Invite has expired.", 400));
    }

    if (invite.accepted) {
      return next(createError("This invite has already been used.", 400));
    }

    res.status(200).json({
      success: true,
      message: "Invite sent.",
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
