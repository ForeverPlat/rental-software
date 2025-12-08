import express from 'express';
import { createCustomer, getCustomer, getUserCustomers, getCustomers, getCustomersByName, getUserCustomersByName, getCustomerBatch, updateCustomer, updateUserCustomer } from '../Controllers/customerController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const customerRouter = express.Router();

customerRouter.post('/', authMiddleware, createCustomer);

customerRouter.post('/batch', getCustomerBatch);

customerRouter.get('/', getCustomers);

customerRouter.get('/user', authMiddleware, getUserCustomers);

customerRouter.get('/by-name', getCustomersByName);

customerRouter.get('/user/by-name', authMiddleware, getUserCustomersByName);

customerRouter.get('/:customerId', getCustomer);

customerRouter.put('/:customerId', updateCustomer);

customerRouter.put('/user/:customerId', authMiddleware, updateUserCustomer);

// customerRouter.delete('/:customerId', deleteCustomer);

export default customerRouter;

