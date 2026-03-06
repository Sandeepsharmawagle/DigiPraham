const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Send an email.
 * @param {string} to      - Recipient email
 * @param {string} subject - Subject line
 * @param {string} html    - HTML body
 */
const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"DigiPratham" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    });
};

// ── Templates ────────────────────────────────────────────────────────────────

const emailBase = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin:0; padding:0; background:#0F0C1E; font-family: 'Segoe UI', Arial, sans-serif; color:#E8E9FF; }
    .wrapper { max-width:560px; margin:40px auto; background:#13102A; border:1px solid rgba(108,99,255,0.25); border-radius:16px; overflow:hidden; }
    .header  { background:linear-gradient(135deg,#6C63FF,#FF6584); padding:32px 40px; text-align:center; }
    .header img { width:48px; height:48px; border-radius:10px; }
    .header h1  { margin:12px 0 0; font-size:22px; color:#fff; font-weight:800; letter-spacing:-0.02em; }
    .body    { padding:36px 40px; }
    .body p  { color:#9495B8; font-size:15px; line-height:1.7; margin:0 0 18px; }
    .body h2 { color:#E8E9FF; font-size:18px; font-weight:700; margin:0 0 12px; }
    .btn     { display:inline-block; padding:14px 32px; background:linear-gradient(135deg,#6C63FF,#FF6584); color:#fff !important; text-decoration:none; border-radius:10px; font-weight:700; font-size:15px; margin:8px 0 20px; }
    .notice  { background:rgba(108,99,255,0.08); border:1px solid rgba(108,99,255,0.2); border-radius:10px; padding:14px 18px; font-size:13px; color:#9495B8; }
    .footer  { padding:20px 40px; border-top:1px solid rgba(108,99,255,0.15); text-align:center; font-size:12px; color:#5A5B7A; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="https://res.cloudinary.com/dunualrkz/image/upload/v1772440278/Digipratham_xiukmb.png" alt="DigiPratham" />
      <h1>DigiPratham</h1>
    </div>
    <div class="body">${content}</div>
    <div class="footer">© ${new Date().getFullYear()} DigiPratham. All rights reserved.</div>
  </div>
</body>
</html>`;

const verifyEmailTemplate = (name, link) => emailBase(`
  <h2>Verify Your Email Address</h2>
  <p>Hi ${name},</p>
  <p>Welcome to <strong style="color:#6C63FF">DigiPratham</strong>! Please confirm your email address by clicking the button below.</p>
  <a href="${link}" class="btn">Verify Email Address</a>
  <div class="notice">This link expires in <strong>24 hours</strong>. If you did not create an account, please ignore this email.</div>
`);

const resetPasswordTemplate = (name, link) => emailBase(`
  <h2>Reset Your Password</h2>
  <p>Hi ${name},</p>
  <p>We received a request to reset the password for your DigiPratham account. Click the button below to set a new password.</p>
  <a href="${link}" class="btn">Reset Password</a>
  <div class="notice">This link expires in <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email.</div>
`);

module.exports = { sendEmail, verifyEmailTemplate, resetPasswordTemplate };
