import express from 'express';
import { createBooking, deleteBooking, getBooking, getBookings, getBookingsMetrics , updateBooking, getUserBookings, updateUserBookingStatus } from "../Controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post('/', createBooking);

bookingRouter.get('/', getBookings);

bookingRouter.get('/:bookingId', getBooking);

bookingRouter.get('/metrics', getBookingsMetrics);

bookingRouter.put('/:bookingId', updateBooking);

bookingRouter.delete('/:bookingId', deleteBooking);

//  More specific routes

bookingRouter.get('/user', getUserBookings);

bookingRouter.put('/bookingId', updateUserBookingStatus);

export default bookingRouter;