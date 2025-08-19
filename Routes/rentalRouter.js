import { Router } from "express";
import { createRental, deleteRental, getRental, getRentals, updateRental, getUserRentals, updateUserRentalStatus } from "../Controllers/rentalController.js";

const rentalRouter = Router();

rentalRouter.post('/', createRental);

rentalRouter.get('/', getRentals);

rentalRouter.get('/:rentalId', getRental);

rentalRouter.put('/:rentalId', updateRental);

rentalRouter.delete('/:rentalId', deleteRental);

//  More specific routes
//  Thinking about change name from rental to booking

rentalRouter.get('/user', getUserRentals);

rentalRouter.put('/rentalId', updateUserRentalStatus);

export default Router;