import express from 'express';
import { createCustomer, getCustomer, getCustomers, getCustomersByName, getCustomerBatch, updateCustomer } from '../Controllers/customerController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const customerRouter = express.Router();

customerRouter.post('/', authMiddleware, createCustomer);

customerRouter.post('/batch', getCustomerBatch);

customerRouter.get('/', getCustomers);

customerRouter.get('/by-name', getCustomersByName);

customerRouter.get('/:customerId', getCustomer);

customerRouter.put('/:customerId', updateCustomer);

// customerRouter.delete('/:customerId', deleteCustomer);

//  More specific

// customerRouter.get('/user', getUserCustomers);

export default customerRouter;

