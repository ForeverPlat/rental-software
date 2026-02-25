import { request } from "../../lib/http";

export const getBookings = async () => {
  const result = await request("/bookings/user");
  return result.data;
};

export const getBookingsStats = async () => {
  const result = await request("/bookings/metrics"); // need to create metrics/user
  return result.data;
};

export const getUpcomingBookings = async () => {
  const result = await request("/bookings/user/upcoming");
  console.log(result);
  return result.data;
};

export const updateBooking = async (id, updatedBooking) => {
  const result = await request(`/bookings/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedBooking),
  });

  return result.data;
};
