import express from 'express';
import { createItem, deleteItem, getItem, getItems, updateItem, getUserItems } from "../Controllers/itemController.js";
import authMiddleware from '../Middleware/authMiddleware.js';

const itemRouter = express.Router();

itemRouter.post('/', authMiddleware, createItem);

itemRouter.get('/', getItems);

itemRouter.get('/:id', getItem);

itemRouter.put('/:id', updateItem);

itemRouter.delete('/:id', deleteItem);

//  More specific routes

itemRouter.get('/user', getUserItems);



export default itemRouter;