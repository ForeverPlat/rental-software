import Company from "../Models/Company.js";
import User from "../Models/User.js";
import { createError } from "../utils/createError.js";

export const createCompany = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { name } = req.body;

    if (!name || !String(name).trim()) {
      return next(createError("Company name is required.", 400));
    }

    const user = await User.findById(userId);

    if (!user) {
      return next(createError("User not found.", 404));
    }

    if (user.company) {
      return next(createError("You already belong to a company.", 400));
    }

    const company = await Company.create({
      name: String(name).trim(),
      owner: userId,
    });

    user.company = company._id;
    user.role = "admin";
    await user.save();

    const populatedUser = await User.findById(userId)
      .select("-password -verificationToken -verificationTokenExpires")
      .populate("company", "name owner createdAt");

    res.status(201).json({
      success: true,
      message: "Company created.",
      data: {
        company,
        user: populatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanyMembers = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).populate("company", "name");

    if (!user) {
      return next(createError("User not found.", 404));
    }

    if (!user.company) {
      return res.status(200).json({
        success: true,
        message: "No company.",
        data: {
          company: null,
          members: [],
        },
      });
    }

    const companyId = user.company._id;

    const members = await User.find({ company: companyId })
      .select("username email role")
      .sort({ username: 1 })
      .lean();

    const safeMembers = members.map((m) => ({
      id: m._id,
      username: m.username,
      email: m.email,
      role: m.role,
    }));

    res.status(200).json({
      success: true,
      message: "Company members retrieved.",
      data: {
        company: {
          id: user.company._id,
          name: user.company.name,
        },
        members: safeMembers,
      },
    });
  } catch (error) {
    next(error);
  }
};
