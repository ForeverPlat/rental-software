import { request } from "../../lib/http";

export const getBookings = async () => {
  const result = await request("/bookings/user");
  return result.data;
};

export const getBookingsStats = async () => {
  const result = await request("/bookings/metrics"); // need to create metrics/user
  console.log(result);
  return result.data;
};
