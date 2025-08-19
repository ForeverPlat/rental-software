import nodemailer from 'nodemailer';

export const sendVerificationEmail = async ({ _id, username, email, verificationToken }) => {
  if (!_id || !email || !verificationToken) {
    throw new Error('Missing user data for email verification');
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `http://localhost:${process.env.PORT}/api/auth/verify-email?userId=${_id}&verificationToken=${verificationToken}`;

  await transporter.sendMail({
    from: 'noreply.println.typinggame@gmail.com',
    to: email,
    subject: 'Verify your email',
    html: `<p>Welcome to Typing Game, ${username}!</p>
           <p>Please verify your email by clicking the link below:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  });
};