import { Router } from "express";
import { createItem, deleteItem, getItem, getItems, updateItem, getUserItems } from "../Controllers/itemController.js";

const itemRouter = Router();

itemRouter.post('/', createItem);

itemRouter.get('/', getItems);

itemRouter.get('/:id', getItem);

itemRouter.put('/:id', updateItem);

itemRouter.delete('/:id', deleteItem);

//  More specific routes

itemRouter.get('/user', getUserItems);



export default Router;