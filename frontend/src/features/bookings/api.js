import { request } from "../../lib/http";

// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
const apiUrl = "http://localhost:2000";

// export const getBookings = async () => {
//   const token = localStorage.getItem("token");
//
//   try {
//     const res = await fetch(`${apiUrl}/api/bookings/user`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//
//     if (!res.ok) {
//       throw new Error(`Failed to fetch bookings: ${res.status}`);
//     }
//
//     const result = await res.json();
//     console.log(result);
//     return result.data;
//   } catch (error) {
//     console.error(`Error fetching bookings: ${error}`);
//     throw error;
//   }
// };

export const getBookings = async () => {
  const result = await request("/bookings/user");
  return result.data;
};

export const getBookingsStats = async () => {
  const result = await request("/bookings/metrics"); // need to create metrics/user
  console.log(result);
  return result.data;
};
