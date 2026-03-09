import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {
  getUser,
  inviteUser,
  updatePassword,
  updateUser,
  validateInvite,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getUser);

userRouter.get("/invites/:token", authMiddleware, validateInvite);

userRouter.post("/invite", authMiddleware, inviteUser);

userRouter.patch("/me", authMiddleware, updateUser);

userRouter.patch("/password", authMiddleware, updatePassword);

export default userRouter;
