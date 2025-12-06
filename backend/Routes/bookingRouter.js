import express from 'express';
import { createBooking, deleteBooking, getBooking, getBookings, getBookingsMetrics , updateBooking, updateUserBooking, getUserBookings, updateUserBookingStatus, getTodaysBookings } from "../Controllers/bookingController.js";
import authMiddleware from '../Middleware/authMiddleware.js';

const bookingRouter = express.Router();

bookingRouter.post('/', authMiddleware, createBooking);

bookingRouter.get('/', getBookings);

//  position matters (ensures metrics is not seen as param)
bookingRouter.get('/metrics', getBookingsMetrics);

bookingRouter.get('/today', getTodaysBookings);

bookingRouter.get('/user', authMiddleware, getUserBookings);

bookingRouter.get('/:bookingId', getBooking);

bookingRouter.patch('/bookingId', authMiddleware,updateUserBookingStatus);

bookingRouter.put('/:bookingId', updateBooking);

bookingRouter.put('/user/:bookingId', authMiddleware,updateUserBooking);

bookingRouter.delete('/:bookingId', deleteBooking);


export default bookingRouter;