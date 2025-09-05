import User from '../Models/User.js';
import { createError } from '../utils/createError.js';
import { sendVerificationEmail } from '../utils/sendVerificationEmail.js';

import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        //  check if username/email is already in the db
        const user = await User.findOne({ $or: [{ username }, { email }] });
        
        if (user && user.verified) {
            return next(createError('This user already exists.', 409));
        }

        if (!username || !email || !password) {
            return next(createError('All fields need to be filled', 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpires,
            role: 'user'
        });

        await newUser.save();

        await sendVerificationEmail(newUser);
        
        const safeUser = { username: newUser.username };

        return res.json({
            success: true,
            message: 'Signup Successful.',
            data: safeUser
        });

    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const { email, role, verified, verificationToken, verificationTokenExpires } = user;

        if (!username || !password) {
            return next(createError('All fields need to be filled', 400));
        } 
        
        if (!user) {
            return next(createError('User not found.', 404));
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return next(createError('Incorrect Password', 401));
        }

        if (!verified) {
            // If expired or not set, generate a new token
            const now = new Date();
            if (!verificationToken || verificationTokenExpires < now) {
                verificationToken = crypto.randomBytes(32).toString('hex');
                verificationTokenExpires = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour

                await user.save();
                await sendVerificationEmail(user);

                return next(createError('Email not verified. Verification email sent.', 403));
            }

            return next(createError('Email not verified. Please check your inbox.', 403));
        }

        const token = jwt.sign({
            userId: user._id,
            username,
            email,
            role,
            verified
        }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        const safeUser = { username: user.username };

        return res.json({
            success: true,
            message: 'Login Successful.',
            data: {
                token,
                verified,
                user: safeUser
            }
        });

    } catch (error) {
        next(error);
    }
}