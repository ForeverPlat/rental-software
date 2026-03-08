import User from "../Models/User.js";
import { createError } from "../utils/createError.js";

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
