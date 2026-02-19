import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { getStats } from "../Controllers/homeController.js";

const homeRouter = express.Router();

homeRouter.get("/stats/user", authMiddleware, getStats);

export default homeRouter;
