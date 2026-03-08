import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import {
  getUser,
  updatePassword,
  updateUser,
} from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getUser);

userRouter.patch("/me", authMiddleware, updateUser);

userRouter.patch("/password", authMiddleware, updatePassword);

export default userRouter;
