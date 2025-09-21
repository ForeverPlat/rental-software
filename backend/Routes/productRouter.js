import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, getUserProducts } from "../Controllers/productController.js";
import authMiddleware from '../Middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/', authMiddleware, createProduct);

productRouter.get('/', getProducts);

productRouter.get('/:id', getProduct);

productRouter.put('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

//  More specific routes

productRouter.get('/user', getUserProducts);



export default productRouter;