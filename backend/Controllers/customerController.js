import Customer from "../Models/Customer.js";
import createError from '../utils/createError.js';

export const createCustomer = async (req, res, next) => {
    
    try {
        // const 
        const { userId } = req.user;
        const { itemId, name, pricePerDay, category } = req.body;

        if (!itemId || !name || !pricePerDay || !category) {
            return next(createError('All fields most be filled.', 400));
        }

        //  Make the itemId something like this schema (userId-itemId)
        //  Scrap this idea for now

        const newItem = new Item({
            userId,
            itemId,
            name,
            pricePerDay,
            category
        });
        await newItem.save();

        res.status(200).json({
            success: true,
            message: `Item ${name} created successfully.`
        });
        
    } catch (error) {
        next(error);
    }
}