//  Think of /inventory as the live status of the physical stock.

import express from 'express';
import { createInventory, deleteInventory, getInventories, getInventory, updateInventory } from "../Controllers/inventoryController.js";
import authMiddleware from '../Middleware/authMiddleware.js';

const inventoryRouter = express.Router();

inventoryRouter.post('/:productId', authMiddleware, createInventory);

inventoryRouter.get('/', getInventories);

inventoryRouter.get('/:productId', getInventory);

inventoryRouter.put('/:productId', updateInventory);

inventoryRouter.delete('/:productId', deleteInventory);

export default inventoryRouter;