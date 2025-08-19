import User from "../Models/User.js";
import { createError } from "../utils/createError.js";

export const verifyEmailController = async (req, res, next) => {
    try {
        const { userId, verificationToken } = req.query;

        const user = await User.findOne({ 
            _id: userId,
            verificationToken
        });

        if (!user) {
            return next(createError('Invalid or expired verification link.', 400));
        }

        //  verification token expired
        if (user.verificationTokenExpires && user.verificationTokenExpires < Date.now()) {
            return next(createError('Verification link has expired', 400));
        }

        // already verified
        if (user.verified) {
            return res.status(200).json({ message: 'Email already verified.' });
        }

        user.verified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (error) {
        next(error);
    }
}