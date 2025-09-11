import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectToDB from './Database/db.js';

import item from './Routes/itemRouter.js';
import inventory from './Routes/inventoryRouter.js';
import booking from './Routes/bookingRouter.js';
import auth from './Routes/authRouter.js';
import verifyEmail from './Routes/verifyEmailRouter.js';

import errorHandler from './Middleware/errorHandler.js';

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

app.use('/api/item', item);
app.use('/api/inventory', inventory);
app.use('/api/booking', booking);
app.use('/api/auth', auth);
app.use('/api/auth', verifyEmail);

app.use(errorHandler);

connectToDB().then(() => {
    app.listen(port, () => console.log('Server is running on 2000'));
}).catch((error) => {
    console.error('Failed to connect to database: ', error);
})