import Customer from "../Models/Customer.js";
import { createError } from '../utils/createError.js';

export const createCustomer = async (req, res, next) => {
    
    try {
        const { userId } = req.user;
        const { name, email, number } = req.body;

        if (!name || !email || !number ) {
            return next(createError('All fields most be filled.', 400));
        }

        const newCustomer = new Customer({
            user: userId,
            name,
            email,
            number
        });
        await newCustomer.save();

        res.status(200).json({
            success: true,
            message: `Customer ${name} created successfully.`
        });
        
    } catch (error) {
        next(error);
    }
}

export const getCustomers = async (req, res, next) => {

    try {
        const customers = await Customer.find();

        if (!customers) {
            return next(createError('No customers found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `customers found.`,
            data: customers 
        });

    } catch (error) {
        next(error);
    }
}

export const getCustomer = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            return next(createError('All parameters most be filled.', 400));
        }

        const customer = await Customer.findById(id);

        if (!customer) {
            return next(createError(`Customer with id ${id} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Customer with id ${id} was found.`,
            data: customer
        });

    } catch (error) {
        next(error);
    }
}

export const getCustomersByName = async (req, res, next) => {

    try {
        const { search } = req.query;

        if (!search) {
            return res.status(200).json({
                success: true,
                data: { customers: [] }
            });
        }

        // regex does partial matching
        const customers = await Customer.find({
            name: { $regex: search, $options: 'i' } // 'i' for case insensitive
        }).limit(5);

        return res.status(200).json({
            success: true,
            data: customers
        });

    } catch (error) {
        next(createError('Failed to search customers.', 500));
    }
}

export const getCustomerBatch = async (req, res, next) => {

    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return next(createError('A non-empty array of IDs is required.', 400));
        }

        const customers = {};

        for (let i = 0; i < ids.length; i++) {
            
            const currCustomer = await Customer.findById(ids[i]);

            if (currCustomer) {
                customers[currCustomer.id] = currCustomer;
            } else {
                console.warn(`Customer with ID ${ids[i]} not found.`);
            }
        }

        if (Object.keys(customers).length === 0) {
            return next(createError(`No customers found for the provided Ids.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Customers found.`,
            data: customers
        });

    } catch (error) {
        next(error);
    }
}

export const updateCustomer = async (req, res, next) => {
    const { customerId } = req.params;
    const updates = req.body;
    

    if (!customerId || !updates || typeof updates != 'object') {
        return next(createError('All parameters most be filled.', 400));
    }

    const allowedFields = ['name', 'email']
    const updateKeys = Object.keys(updates);

    if (updateKeys.length === 0) {
        return next(createError('No update data provided.', 404));
    }

    const isValidUpdate = updateKeys.every(key => allowedFields.includes)

    if (!isValidUpdate) {
        return next(createError('Invalid field update.', 404));
    }

    try {

        const updatedItem = await Customer.findByIdAndUpdate(
            customerId,
            { $set: updates },
            { new: true }   // returns updated document
        );

        if (!updatedItem) {
            return next(createError(`Customer with bookingId ${customerId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Booking with bookingId ${customerId} was updated.`,
            data: updatedItem
        });

    } catch (error) {
        next(error);
    }
}