//  Think of /inventory as the live status of the physical stock.

import { Router } from "express";
import { createInventory, deleteInventory, getInventories, getInventory, updateInventory } from "../Controllers/inventoryController.js";

const inventoryRouter = Router();

inventoryRouter.post('/:itemId', createInventory);

inventoryRouter.get('/', getInventories);

inventoryRouter.get('/:itemId', getInventory);

inventoryRouter.put('/:itemId', updateInventory);

inventoryRouter.delete('/:itemId', deleteInventory);

export default Router;