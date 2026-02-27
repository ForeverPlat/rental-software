//  Think of /inventory as the live status of the physical stock.

import express from "express";
import {
  createInventory,
  deleteInventory,
  getInventoryById,
  getLowStockInventories,
  getUserInventories,
  searchUserInventory,
  updateUserInventory,
} from "../Controllers/inventoryController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const inventoryRouter = express.Router();

inventoryRouter.post("/", authMiddleware, createInventory);

inventoryRouter.get("/user", authMiddleware, getUserInventories);

inventoryRouter.get("/user/low-stock", authMiddleware, getLowStockInventories);

inventoryRouter.get("/user/by-name", authMiddleware, searchUserInventory);

inventoryRouter.get("/user/:id", authMiddleware, getInventoryById);

inventoryRouter.put("/user/:id", authMiddleware, updateUserInventory);

inventoryRouter.delete("/user/:id", deleteInventory);

// inventoryRouter.post("/:productId", authMiddleware, createInventory);
//
// inventoryRouter.get("/", getInventories);
//
// inventoryRouter.get("/:productId", getInventory);
//
// inventoryRouter.put("/:inventoryId", updateInventory);
//
//

export default inventoryRouter;
