import express from 'express';
import { createBooking, deleteBooking, getBooking, getBookings, getBookingsMetrics , updateBooking, getUserBookings, updateUserBookingStatus, getTodaysBookings } from "../Controllers/bookingController.js";
import authMiddleware from '../Middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/', authMiddleware, createBooking);

bookingRouter.get('/', getBookings);

//  position matters (ensures metrics is not seen as param)
bookingRouter.get('/metrics', getBookingsMetrics);

bookingRouter.get('/today', getTodaysBookings);

bookingRouter.get('/:bookingId', getBooking);

bookingRouter.put('/:bookingId', updateBooking);

bookingRouter.delete('/:bookingId', deleteBooking);

//  More specific routes

bookingRouter.get('/user', getUserBookings);

bookingRouter.put('/bookingId', updateUserBookingStatus);

export default bookingRouter;