import Booking from "../Models/Booking.js";
import Customer from "../Models/Customer.js";
import Inventory from "../Models/Inventory.js";

export const getStats = async (req, res, next) => {
  try {
    const { userId, username } = req.user;

    if (!userId) {
      return next(createError("All parameters must be filled.", 400));
    }

    const bookings = await Booking.countDocuments({ user: userId });
    const customers = await Customer.countDocuments({ user: userId });
    const products = await Inventory.countDocuments({ user: userId });

    if (bookings == 0 && customers == 0 && products == 0) {
      return next(createError(`Stats for ${username} was not found.`, 404));
    }

    const revenueAggregation = await Booking.aggregate([
      { $match: { user: userId } },
      { $unwind: "$payment" },
      { $match: { "payment.status": "paid" } },
      {
        $group: { _id: null, total: { $sum: "$payment.amount" } },
      },
    ]);
    const totalRevenue =
      revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

    res.status(200).json({
      success: true,
      message: `Stats retrived successfully.`,
      data: {
        revenue: totalRevenue,
        bookings,
        customers,
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};
