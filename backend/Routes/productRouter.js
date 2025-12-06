import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct, getUserProducts, getProductsByName } from "../Controllers/productController.js";
import authMiddleware from '../Middleware/authMiddleware.js';

const productRouter = express.Router();

productRouter.post('/', authMiddleware, createProduct);

productRouter.get('/', getProducts);

productRouter.get('/user', authMiddleware, getUserProducts);

productRouter.get('/by-name', getProductsByName);

productRouter.get('/:id', getProduct);

productRouter.put('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

export default productRouter;