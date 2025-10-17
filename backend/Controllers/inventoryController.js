import Inventory from "../Models/Inventory.js";
import Product from "../Models/Product.js";
import { createError } from "../utils/createError.js";

export const createInventory = async (req, res, next) => {
        
    try {
        const { userId } = req.user;
        const { productId } = req.params;
        const { productName, totalStock } = req.body;
        // product name should be gotten use id

        if (!productId || !totalStock) {
            return next(createError('All fields most be filled.', 400));
        }

        const newInventory = new Inventory({
            user: userId,
            product: productId, 
            productName,
            totalStock,
            available: totalStock,
            reserved: 0
        });
        await newInventory.save();

        res.status(200).json({
            success: true,
            message: `Inventory for ${productId} created successfully.`
        });
        
    } catch (error) {
        next(error);
    }
}

export const getInventories = async (req, res, next) => {

    try {
        const inventories = await Inventory.find();

        if (!inventories) {
            return next(createError('No inventories found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Inventories found.`,
            data: inventories
        });

    } catch (error) {
        next(error);
    }
}

export const getInventory = async (req, res, next) => {

    try {
        const { productId } = req.params;

        if (!productId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const inventory = await Inventory.find({ product: productId });

        if (inventory.length == 0) {
            return next(createError(`Inventory for product with productId ${productId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Inventory for product with productId ${productId} was found.`,
            data: inventory[0]
        });

    } catch (error) {
        next(error);
    }
}

export const updateInventory = async (req, res, next) => {

    const { productId } = req.param;
    const updates = req.body;
    const { productName } = updates;

    if (!productId || !updates|| typeof updates != 'object') {
        return next(createError('All parameters most be filled.', 400));
    }

    const allowedFields = ['productName', 'totalStock']
    const updateKeys = Object.keys(updates);

    if (updateKeys.length === 0) {
        return next(createError('No update data provided.', 404));
    }

    const isValidUpdate = updateKeys.every(key => allowedFields.includes)

    if (!isValidUpdate) {
        return next(createError('Invalid field update.', 404));
    }

    try {

        const updatedInventory = await Inventory.findByIdAndUpdate(
            productId,
            { $set: updates },
            { new: true }   // returns updated document
        );

        if (updateKeys.includes("productName")){
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { $set: { name: productName } },
                { new: true }
            );

            if (!updatedProduct) {
                return next(createError(`Inventory for product with productId ${productId} not found.`, 404));
            }
        }

        if (!updatedInventory) {
            return next(createError(`Inventory for product with productId ${productId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Inventory for product with productId ${productId} was updated.`,
            data: updatedInventory
        });

    } catch (error) {
        next(error);
    }
}

export const deleteInventory = async (req, res, next) => {

    try {
        const { productId } = req.param;

        if (!productId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const inventory = await Inventory.findByIdAndDelete(productId);

        if (!inventory) {
            return next(createError(`Inventory for product with productId ${productId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Inventory for product with productId ${productId} was deleted.`,
            data: inventory
        });

    } catch (error) {
        next(error);
    }
}