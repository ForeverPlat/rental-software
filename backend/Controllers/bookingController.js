import Booking from '../Models/Booking.js';
import Customer from '../Models/Customer.js'
import { createError } from '../utils/createError.js';

const VALID_STATUSES = ['pending', 'confirmed', 'completed', 'canceled'];

export const createBooking = async (req, res, next) => {
    
    try {
        const { userId } = req.user;
        const { customerId, products , startDate, endDate, status, payment } = req.body;

        // console.log( customerId, products , startDate, endDate, status, payment )

        if (!customerId || !products || !startDate || !endDate || !status || !payment) {
            return next(createError('All fields most be filled.', 400));
        }

        if (new Date(startDate) >= new Date(endDate)) {
            return next(createError('Start date must be before end date.', 400));
        }

        if (!VALID_STATUSES.includes(status)) {
            return next(createError('Invalid status value.', 400));
        }

        const newBooking = new Booking({
            user: userId,
            customerId,
            products,
            startDate,
            endDate,
            status,
            payment
        });
        await newBooking.save();

        res.status(200).json({
            success: true,
            message: `Booking created successfully.`
        });
        
    } catch (error) {
        next(error);
    }
}

export const getBookings = async (req, res, next) => {

    try {
        const bookings = await Booking.find();

        if (!bookings) {
            return next(createError('No bookings found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Bookings found.`,
            data: bookings
        });

    } catch (error) {
        next(error);
    }
}

export const getBooking = async (req, res, next) => {

    try {
        const { bookingId } = req.params;

        if (!bookingId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return next(createError(`Booking with bookingId ${bookingId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Booking with bookingId ${bookingId} was found.`,
            data: booking
        });

    } catch (error) {
        next(error);
    }
}

export const getTodaysBookings = async (req, res, next) => {
    
    try {

        // this doesn't store time (add a time ot the booking schema?)
        // const currentDate = new Date();
        const currentDate = '2025-10-01T00:00:00.000+00:00';

        const todaysBookings = await Booking.find({ startDate: currentDate })

        // promise.all ensures all the async code happens in proper order before everything is sent
        // at least as far as ik
        const allBookingData = await Promise.all(todaysBookings.map(async (booking) => {
            const { name, email } = await Customer.findById(booking.customerId);

            if (!name || !email) {
                throw createError(`Customer not found for booking ID ${booking._id}`, 404);
            }

            let quantity = 0;

            booking.products.map((product) => {
                quantity += product.quantity;
            });

            return {
                startDate: booking.startDate,
                name,
                email,
                quantity
            };
            // console.log(bookingData);
            
            // console.log(allBookingData);
            // allBookingData.push(bookingData);
            // console.log(allBookingData);
        }));

        console.log(allBookingData);
        
        if (!todaysBookings) {
            return next(createError('No bookings found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Booking metrics sent.`,
            data: allBookingData
        });

    } catch (error) {
        next(error);
    }
}

export const getBookingsMetrics = async (req, res, next) => {
    
    try {
        const totalBookings = await Booking.countDocuments({});
        
        const quantityAggregation = await Booking.aggregate([
            { $unwind: "$products" },
            {
                $group: { _id: null, total: { $sum: "$products.quantity" } }
            }
        ]);
        const totalProductQuantity = quantityAggregation.length > 0 ? quantityAggregation[0].total : 0;

        //  filters for only completed bookings
        const revenueAggregation = await Booking.aggregate([
            { $match: { status: "completed" } },
            { $unwind: "$payment" },
            {
                $group: { _id: null, total: { $sum: "$payment.amount" } }
            }
        ]);
        const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

        const dueAggregation = await Booking.aggregate([
            { $match: { status: { $ne: "completed" } } },
            { $unwind: "$payment" },
            {
                $group: { _id: null, total: { $sum: "$payment.amount" } }
            }
        ]);
        const totalAmountDue = dueAggregation .length > 0 ? dueAggregation [0].total : 0;


        if (!totalBookings) {
            return next(createError('No bookings found.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Booking metrics sent.`,
            data: {
                bookings: totalBookings,
                products: totalProductQuantity,
                revenue: totalRevenue,
                due: totalAmountDue
            }
        });

    } catch (error) {
        next(error);
    }
}

export const updateBooking = async (req, res, next) => {

    try {
        const { bookingId } = req.params;

        if (!bookingId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            req.body,
            { new: true }   // returns updated document
        );

        if (!booking) {
            return next(createError(`Booking with bookingId ${bookingId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Booking with bookingId ${bookingId} was updated.`,
            data: booking
        });

    } catch (error) {
        next(error);
    }
}

export const deleteBooking = async (req, res, next) => {

    try {
        const { bookingId } = req.params;

        if (!bookingId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const booking = await Booking.findOneAndDelete({ bookingId });

        if (!booking) {
            return next(createError(`Booking with bookingId ${bookingId} not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Booking with bookingId ${bookingId} was deleted.`,
            data: booking
        });

    } catch (error) {
        next(error);
    }
}

//  More specific

export const getUserBookings = async (req, res, next) => {

    try {
        const { userId, username } = req.user;

        if (!userId) {
            return next(createError('All parameters most be filled.', 400));
        }

        const bookings = await Booking.find({ user: userId });

        if (!bookings) {
            return next(createError(`Bookings for ${username} was not found.`, 404));
        }

        res.status(200).json({
            success: true,
            message: `Bookings for ${username} was found.`,
            data: products
        });

    } catch (error) {
        next(error);
    }
}

export const updateUserBookingStatus = async (req, res, next) => {

    try {
        const { userId } = req.user;
        const { bookingId } = req.params;
        const { status } = req.body;

        if (!userId || !bookingId || !status) {
            return next(createError('All parameters most be filled.', 400));
        }

        if (!VALID_STATUSES.includes(status)) {
            return next(createError('Invalid status value.', 400));
        }

        const booking = await Booking.findByIdAndUpdate(
            { _id: bookingId, user: userId },    //  Looking for both ensures user owns the booking
            { $set: { status } },
            { new: true }   //  returns updated document
        );

        if (!booking) {
            return next(createError('Booking not found or you are not authorized.', 404));
        }

        res.status(200).json({
            success: true,
            message: `Booking with bookingId ${bookingId} was updated.`,
            data: booking
        });

    } catch (error) {
        next(error);
    }
}
