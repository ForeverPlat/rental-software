import express from 'express';
import connectToDB from './Database/db';

import item from './Routes/itemRouter.js';
import inventory from './Routes/inventoryRouter.js';
import rental from './Routes/rentalRouter.js';
import auth from './Routes/authRouter.js';
import verifyEmail from './Routes/verifyEmailRouter.js';

import errorHandler from './Middleware/errorHandler.js';

const port = process.env.PORT || 2000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/item', item);
app.use('/api/inventory', inventory);
app.use('/api/rental', rental);
app.use('/api/auth', auth);
app.use('/api/auth', verifyEmail);

app.use(errorHandler);

connectToDB.then(() => {
    app.listen(port, () => console.log('Server is running on 2000'));
}).catch((error) => {
    console.error('Failed to connect to database: ', error);
})