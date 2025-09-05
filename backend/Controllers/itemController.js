import Item from '../Models/Item.js';
import { createError } from '../utils/createError.js';

export const createItem = async (req, res, next) => {
    
    try {
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

export const getItems = async (req, res, next) => {

    try {
        const items = await Item.find();

        if (!items) {
            return next(createError('No items found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Items found.`,
            data: items
        });

    } catch (error) {
        next(error);
    }
}

export const getItem = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            return next(createError('All parameters most be filled.', 400));
        }

        const item = await Item.findById(id);

        if (!item) {
            return next(createError(`Item with id ${id} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Item with id ${id} was found.`,
            data: item
        });

    } catch (error) {
        next(error);
    }
}

export const updateItem = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            return next(createError('All parameters most be filled.', 400));
        }

        const item = await Item.findByIdAndUpdate(
            id,
            req.body,
            { new: true }   // returns updated document
        );

        if (!item) {
            return next(createError(`Item with id ${id} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Item with id ${id} was updated.`,
            data: item
        });

    } catch (error) {
        next(error);
    }
}

export const deleteItem = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            return next(createError('All parameters most be filled.', 400));
        }

        const item = await Item.findByIdAndDelete({ id });

        if (!item) {
            return next(createError(`Item with id ${id} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Item with id ${id} was deleted.`,
            data: item
        });

    } catch (error) {
        next(error);
    }
}

//  More specific

export const getUserItems = async (req, res, next) => {

    try {
        const { userId, username } = req.user;

        if (!userId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const items = await Item.find({ user: userId });

        if (!items) {
            return next(createError(`Items for ${username} was not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Items for ${username} was found.`,
            data: items
        });

    } catch (error) {
        next(error);
    }
}
