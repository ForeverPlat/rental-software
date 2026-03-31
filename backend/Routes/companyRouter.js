import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { createCompany } from "../Controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.post("/", authMiddleware, createCompany);

export default companyRouter;
