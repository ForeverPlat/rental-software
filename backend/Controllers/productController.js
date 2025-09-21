import Product from '../Models/Product.js';
import { createError } from '../utils/createError.js';

export const createProduct = async (req, res, next) => {
    
    try {
        const { userId } = req.user;
        const { name, pricePerDay } = req.body;

        if (!name || !pricePerDay ) {
            return next(createError('All fields most be filled.', 400));
        }

        //  Make the productId something like this schema (userId-productId)
        //  Scrap this idea for now

        const newProduct = new Product({
            user: userId,
            name,
            pricePerDay,
        });
        await newProduct.save();

        res.status(200).json({
            success: true,
            message: `Product ${name} created successfully.`
        });
        
    } catch (error) {
        next(error);
    }
}

export const getProducts = async (req, res, next) => {

    try {
        const products = await Product.find();

        if (!products) {
            return next(createError('No products found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Products found.`,
            data: products
        });

    } catch (error) {
        next(error);
    }
}

export const getProduct = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            return next(createError('All parameters most be filled.', 400));
        }

        const product = await Product.findById(id);

        if (!product) {
            return next(createError(`Product with id ${id} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Product with id ${id} was found.`,
            data: product
        });

    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            return next(createError('All parameters most be filled.', 400));
        }

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }   // returns updated document
        );

        if (!product) {
            return next(createError(`Product with id ${id} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Product with id ${id} was updated.`,
            data: product
        });

    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {

    try {
        const { id } = req.params;

        if (!id) {
            return next(createError('All parameters most be filled.', 400));
        }

        const product = await Product.findByIdAndDelete({ id });

        if (!product) {
            return next(createError(`Product with id ${id} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Product with id ${id} was deleted.`,
            data: product
        });

    } catch (error) {
        next(error);
    }
}

//  More specific

export const getUserProducts = async (req, res, next) => {

    try {
        const { userId, username } = req.user;

        if (!userId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const products = await Product.find({ user: userId });

        if (!products) {
            return next(createError(`Products for ${username} was not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Products for ${username} was found.`,
            data: products
        });

    } catch (error) {
        next(error);
    }
}
