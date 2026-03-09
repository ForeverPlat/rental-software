import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendInvitationEmail = async ({ user, company, email, token }) => {
  if (!user || !company || !email || !token) {
    throw new Error("Missing data for invitation email");
  }

  const inviteLink = `${process.env.FRONTEND_URL}/signup?invite=${token}`;

  await transporter.sendMail({
    from: `"The Rental Software" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `You're invited to join ${company}`,
    html: `
      <p>Hello,</p>

      <p><strong>${user}</strong> has invited you to join <strong>${company}</strong> on <strong>The Rental Software</strong>.</p>

      <p>Click the link below to create your account and get started:</p>

      <p>
        <a href="${inviteLink}" style="padding:10px 16px;background:#2563eb;color:white;text-decoration:none;border-radius:4px;">
          Accept Invitation
        </a>
      </p>

      <p>This invitation will expire in <strong>48 hours</strong>.</p>

      <p>If you were not expecting this invitation, you can safely ignore this email.</p>
    `,
  });
};
