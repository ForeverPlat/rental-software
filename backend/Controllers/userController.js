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
