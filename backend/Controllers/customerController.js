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