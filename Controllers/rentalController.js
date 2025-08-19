import Rental from '../Models/Rental.js';
import createError from '../utils/createError.js';

const VALID_STATUSES = ['active', 'completed', 'canceled'];

export const createRental = async (req, res, next) => {
    
    try {
        const { customerId, items , startDate, endDate, status, payment } = req.body;

        if (!customerId || !items || !startDate || !endDate || !status || !payment) {
            return next(createError('All fields most be filled.', 400));
        }

        if (new Date(startDate) >= new Date(endDate)) {
            return next(createError('Start date must be before end date.', 400));
        }

        if (!VALID_STATUSES.includes(status)) {
            return next(createError('Invalid status value.', 400));
        }

        const newRental = new Rental({
            customerId,
            items,
            startDate,
            endDate,
            status,
            payment
        });
        await newRental.save();

        res.status(200).json({
            success: true,
            message: `Rental created successfully.`
        });
        
    } catch (error) {
        next(error);
    }
}

export const getRentals = async (req, res, next) => {

    try {
        const rentals = await Rental.find();

        if (!rentals) {
            return next(createError('No rentals found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Rentals found.`,
            data: rentals
        });

    } catch (error) {
        next(error);
    }
}

export const getRental = async (req, res, next) => {

    try {
        const { rentalId } = req.params;

        if (!rentalId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const rental = await Rental.findById(rentalId);

        if (!rental) {
            return next(createError(`Rental with rentalId ${rentalId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Rental with rentalId ${rentalId} was found.`,
            data: rental
        });

    } catch (error) {
        next(error);
    }
}

export const updateRental = async (req, res, next) => {

    try {
        const { rentalId } = req.params;

        if (!rentalId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const rental = await Rental.findByIdAndUpdate(
            rentalId,
            req.body,
            { new: true }   // returns updated document
        );

        if (!rental) {
            return next(createError(`Rental with rentalId ${rentalId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Rental with rentalId ${rentalId} was updated.`,
            data: rental
        });

    } catch (error) {
        next(error);
    }
}

export const deleteRental = async (req, res, next) => {

    try {
        const { rentalId } = req.params;

        if (!rentalId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const rental = await Rental.findOneAndDelete({ rentalId });

        if (!rental) {
            return next(createError(`Rental with rentalId ${rentalId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Rental with rentalId ${rentalId} was deleted.`,
            data: rental
        });

    } catch (error) {
        next(error);
    }
}

//  More specific

export const getUserRentals = async (req, res, next) => {

    try {
        const { userId, username } = req.user;

        if (!userId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const rentals = await Rental.find({ user: userId });

        if (!rentals) {
            return next(createError(`Rentals for ${username} was not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Rentals for ${username} was found.`,
            data: items
        });

    } catch (error) {
        next(error);
    }
}

export const updateUserRentalStatus = async (req, res, next) => {

    try {
        const { userId } = req.user;
        const { rentalId } = req.params;
        const { status } = req.body;

        if (!userId || !rentalId || !status) {
            return next(createError('All parameters most be filled.', 400));
        }

        if (!VALID_STATUSES.includes(status)) {
            return next(createError('Invalid status value.', 400));
        }

        const rental = await Rental.findByIdAndUpdate(
            { _id: rentalId, user: userId },    //  Looking for both ensures user owns the rental
            { $set: { status } },
            { new: true }   //  returns updated document
        );

        if (!rental) {
            return next(createError('Rental not found or you are not authorized.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Rental with rentalId ${rentalId} was updated.`,
            data: rental
        });

    } catch (error) {
        next(error);
    }
}
