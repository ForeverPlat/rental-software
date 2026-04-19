import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { createCompany, getCompanyMembers } from "../Controllers/companyController.js";

const companyRouter = express.Router();

companyRouter.get("/members", authMiddleware, getCompanyMembers);

companyRouter.post("/", authMiddleware, createCompany);

export default companyRouter;
