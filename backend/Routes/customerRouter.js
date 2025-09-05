import express from 'express';

const customerRouter = express.Router();

customerRouter.post('/', createCustomer);

customerRouter.get('/', getCustomers);

customerRouter.get('/:customerId', getCustomer);

customerRouter.put('/:customerId', updateCustomer);

customerRouter.delete('/:customerId', deleteCustomer);

//  More specific

customerRouter.get('/user', getUserCustomers);

