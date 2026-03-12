import User from "../Models/User.js";
import { createError } from "../utils/createError.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password, inviteToken } = req.body;

    if (!username || !email || !password) {
      return next(createError("All fields are required.", 400));
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser && existingUser.verified) {
      return next(createError("User already exists.", 409));
    }

    let invite = null;

    if (inviteToken) {
      invite = await validateInvite(inviteToken, normalizedEmail);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    let user;

    if (existingUser) {
      existingUser.username = username;
      existingUser.password = hashedPassword;
      existingUser.verificationToken = verificationToken;
      existingUser.verificationTokenExpires = verificationTokenExpires;

      if (invite) existingUser.pendingInvitation = invite._id;

      user = await existingUser.save();
    } else {
      user = await User.create({
        username,
        email: normalizedEmail,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpires,
        pendingInvitation: invite ? invite._id : null,
      });
    }

    await sendVerificationEmail(user);

    res.json({
      success: true,
      message: "Signup successful. Verify your email.",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const {
      email,
      role,
      verified,
      verificationToken,
      verificationTokenExpires,
    } = user;

    if (!username || !password) {
      return next(createError("All fields need to be filled", 400));
    }

    if (!user) {
      return next(createError("User not found.", 404));
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return next(createError("Incorrect Password", 401));
    }

    if (!verified) {
      // If expired or not set, generate a new token
      const now = new Date();
      if (!verificationToken || verificationTokenExpires < now) {
        verificationToken = crypto.randomBytes(32).toString("hex");
        verificationTokenExpires = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour

        await user.save();
        await sendVerificationEmail(user);

        return next(
          createError("Email not verified. Verification email sent.", 403),
        );
      }

      return next(
        createError("Email not verified. Please check your inbox.", 403),
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username,
        email,
        role,
        verified,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );

    const safeUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };

    return res.json({
      success: true,
      message: "Login Successful.",
      data: {
        token,
        verified,
        user: safeUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
