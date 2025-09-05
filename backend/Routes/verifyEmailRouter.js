import express from 'express';
import { verifyEmailController } from '../Controllers/verifyEmailController.js';

const router = express.Router();

router.get('/verify-email', verifyEmailController);

export default router;