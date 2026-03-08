import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { getUser, updateUser } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getUser);

userRouter.patch("/me", authMiddleware, updateUser);

export default userRouter;
