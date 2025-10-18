import nodeCron from "node-cron";
import nodemailer from 'nodemailer';
import { format } from "date-fns"
import { addDays, isAfter, isBefore } from "date-fns"

import Booking from "../Models/Booking";

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const formatDate = (date) => format(date, "PPP 'at' hh:mm a")

const upcomingBooking = async () => {
    cron.schedule('0 8 * * *', async () => {

        try {
            const now = new Date();
            const tomorrow = addDays(now, 1);
            const dayAfter = addDays(now, 2);

            const bookings = await Booking.find({
                pickupDate: {
                    $gte: tomorrow.setHours(0, 0, 0, 0), // starts tomorrow
                    $lt: dayAfter.setHours(0, 0, 0, 0),  // before day after
                },
                status: { $in: ["pending", "picked-up"] }, // status of the booking
                $or: [
                    { notifications: { $exists: false } }, // no notifications yet
                    { "notification.type": { $ne: "upcoming" } }, // no upcoming email sent
                ],
            }).populate("customer.customerId").exec();

            for (const booking of bookings) {
                try {
                    await transporter.sendMail({
                        from: 'the.rental.software@gmail.com',
                        to: booking.customer.email,
                        subject: `Upcoming Booking Reminder (ID: ${booking._id})`,
                        text: `Dear ${booking.customer.name},\n\nYour booking (ID: ${booking._id}) is scheduled for pickup on ${formatDate(
                            booking.pickupDate
                        )}. Please ensure you're ready! Contact support for any questions.\n\nBest,\nRental Team`,
                    });

                    // Record notification
                    booking.notifications.push({ type: "upcoming", sentAt: new Date() });
                    await booking.save();
                    console.log(`Sent upcoming email for booking ${booking._id} to ${booking.user.email}`);
                } catch (error) {
                    console.error("Error in upcomingBooking cron: ", error)
                }
            }
            
        } catch (error) {
            console.error("Error in upcomingBooking cron:", error);
        }
    });
}

const lateBooking = async () => {
    cron.schedule('0 9 * * *', async () => {

        try {
            const now = new Date();
            const threeDaysAgo = addDays(now, -3);

            const bookings = await Booking.find({
                returnDate: { $lt: now },
                status: { $nin: ["returned", "completed", "cancelled", "lost"] },
                $or: [
                    { notifications: { $exists: false } },
                    {
                        $and: [
                            { "notifications.type": "late" },
                            { "notifications.sentAt": { $lt: threeDaysAgo } } // last email > 3 days ago
                        ],
                    },
                    { "notifications.type": { $ne: "late" } }
                ],
            }).populate("customer.customerId").exec();

            for (const booking of bookings) {
                try {
                    await transporter.sendMail({
                        from: '"Rental Software" <the.rental.software@email.com>',
                        to: booking.user.email,
                        subject: `Overdue Rental Return Reminder (ID: ${booking._id})`,
                        text: `Dear ${booking.customer.name},\n\nYour booking (ID: ${booking._id}) was due on ${formatDate(
                            booking.returnDate
                        )}. Please return the items ASAP or contact support. Penalty fees may apply.\n\nBest,\nRental Team`,
                    });

                    booking.notifications.push({ type: "late", sentAt: new Date() });
                    await booking.save();
                    console.log(`Sent late email for booking ${booking._id} to ${booking.user.email}`); 
                } catch (error) {
                    console.error("Error in lateBooking cron:", error)
                }
            }

        } catch (error) {
            console.error("Error in lateBooking cron:", error);
        }

    });
}

const unsettledBooking = async () => {
    cron.schedule('0 8 * * *', async () => {
        
        try {
            const now = new Date();
            const tomorrow = addDays(now, 1);
            const dayAfter = addDays(now, 2);

            const bookings = await Booking.find({
                status: "completed",
                "payment.status": { $nin: ["paid", "processing"] }, // bookings that aren't paid for
                $or: [
                    { notifications: { $exists: false } }, // no notifications yet
                    {
                        $and: [
                            { "notification.type": "unsettled" },
                            { "notification.sentAt": { $lt: sevenDaysAgo } }, // last unsettled email > 7 days ago
                        ],
                    },
                    { "notifications.type": { $ne: "unsettled" } }, // no unsettled email sent
                ],
            }).populate("customer.customerId").exec();

            for (const booking of bookings) {
                try {
                    await transporter.sendMail({
                        from: 'the.rental.software@gmail.com',
                        to: booking.customer.email,
                        subject: `Payment Pending for Completed Booking (ID: ${booking._id})`,
                        text: `Dear ${booking.customer.name},\n\nYour booking (ID: ${booking._id}) is completed, but payment is still pending (status: ${
                            booking.payment.status
                        }, amount: $${booking.payment.amount}). Please settle the balance or contact support.\n\nBest,\nRental Team`,
                    });

                    booking.notifications.push({ type: "unsettled", sentAt: new Date() });
                    await booking.save();
                    console.log(`Sent unsettled email for booking ${booking._id} to ${booking.user.email}`);
                } catch (error) {
                    console.error(`Failed to send unsettled email for booking ${booking._id}:`, error);
                }
            }

        } catch (error) {
           console.error("Error in bookingPayment cron:", error); 
        }
    });
}

export { upcomingBooking, lateBooking, unsettledBooking };