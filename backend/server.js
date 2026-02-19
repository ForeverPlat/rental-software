import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDB from "./Database/db.js";

import home from "./Routes/homeRouter.js";
import product from "./Routes/productRouter.js";
import inventory from "./Routes/inventoryRouter.js";
import booking from "./Routes/bookingRouter.js";
import customer from "./Routes/customerRouter.js";
import auth from "./Routes/authRouter.js";
import verifyEmail from "./Routes/verifyEmailRouter.js";

import errorHandler from "./Middleware/errorHandler.js";
import {
  lateBooking,
  unsettledBooking,
  upcomingBooking,
} from "./utils/sendNotificationEmails.js";

const port = process.env.PORT || 2000;

const app = express();

// app.use(cors({
//   origin: 'http://localhost:5174',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/products", product);
app.use("/api/inventory", inventory);
app.use("/api/bookings", booking);
app.use("/api/customers", customer);
app.use("/api/auth", auth);
app.use("/api/auth", verifyEmail);
app.use("/api/home", home);

app.use(errorHandler);

upcomingBooking();
lateBooking();
unsettledBooking();

connectToDB()
  .then(() => {
    app.listen(port, () => console.log("Server is running on 2000"));
  })
  .catch((error) => {
    console.error("Failed to connect to database: ", error);
  });

