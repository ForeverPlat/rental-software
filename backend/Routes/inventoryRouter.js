//  Think of /inventory as the live status of the physical stock.

import express from 'express';
import { createInventory, deleteInventory, getInventories, getInventory, updateInventory } from "../Controllers/inventoryController.js";

const inventoryRouter = express.Router();

inventoryRouter.post('/:itemId', createInventory);

inventoryRouter.get('/', getInventories);

inventoryRouter.get('/:itemId', getInventory);

inventoryRouter.put('/:itemId', updateInventory);

inventoryRouter.delete('/:itemId', deleteInventory);

export default inventoryRouter;