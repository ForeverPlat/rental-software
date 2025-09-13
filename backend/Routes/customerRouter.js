import express from 'express';
import { createCustomer } from '../Controllers/customerController.js';
import authMiddleware from '../Middleware/authMiddleware.js';

const customerRouter = express.Router();

customerRouter.post('/', authMiddleware, createCustomer);

// customerRouter.get('/', getCustomers);

// customerRouter.get('/:customerId', getCustomer);

// customerRouter.put('/:customerId', updateCustomer);

// customerRouter.delete('/:customerId', deleteCustomer);

//  More specific

// customerRouter.get('/user', getUserCustomers);

export default customerRouter;

