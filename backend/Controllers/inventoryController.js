import Inventory from "../Models/Inventory.js";
import { createError } from "../utils/createError.js";

export const createInventory = async (req, res, next) => {
        
    try {
        const { userId } = req.userInfo;
        const { itemId } = req.param;
        const { totalStock } = req.body;

        if (!itemId, !totalStock) {
            return next(createError('All fields most be filled.', 400));
        }

        const newInventory = new Inventory({
            userId,
            itemId, 
            totalStock,
            available: totalStock,
            reserved: 0
        });
        await newInventory.save();

        res.status(200).json({
            success: true,
            message: `Inventory for ${itemId} created successfully.`
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
        const { itemId } = req.param;

        if (!itemId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const inventory = await Inventory.findById(itemId);

        if (!inventory) {
            return next(createError(`Inventory for item with itemId ${itemId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Inventory for item with itemId ${itemId} was found.`,
            data: inventory
        });

    } catch (error) {
        next(error);
    }
}

export const updateInventory = async (req, res, next) => {

    try {
        const { itemId } = req.param;

        if (!itemId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const inventory = await Inventory.findByIdAndUpdate(
            itemId,
            req.body,
            { new: true }   // returns updated document
        );

        if (!inventory) {
            return next(createError(`Inventory for item with itemId ${itemId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Inventory for item with itemId ${itemId} was updated.`,
            data: inventory
        });

    } catch (error) {
        next(error);
    }
}

export const deleteInventory = async (req, res, next) => {

    try {
        const { itemId } = req.param;

        if (!itemId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const inventory = await Inventory.findByIdAndDelete(itemId);

        if (!inventory) {
            return next(createError(`Inventory for item with itemId ${itemId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Inventory for item with itemId ${itemId} was deleted.`,
            data: inventory
        });

    } catch (error) {
        next(error);
    }
}