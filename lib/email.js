/**
 * Email Utility Functions
 * Handles sending emails for OTP verification and password reset
 */

import nodemailer from "nodemailer";

/**
 * Create email transporter using environment variables
 * @returns {Object} Nodemailer transporter
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

/**
 * Send OTP verification email
 * @param {string} email - Recipient email address
 * @param {string} code - OTP code
 * @param {string} name - User's name
 * @returns {Promise<boolean>} True if email sent successfully
 */
export async function sendOtpEmail(email, code, name = "User") {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || "Coffee Shop <noreply@coffeeshop.com>",
      to: email,
      subject: "Verify Your Email - Coffee Shop",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6F4E37;">Welcome to Coffee Shop!</h2>
          <p>Hi ${name},</p>
          <p>Thank you for registering with Coffee Shop. Please use the following code to verify your email address:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #6F4E37; letter-spacing: 5px; margin: 0;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #888; font-size: 12px;">Coffee Shop - Your favorite coffee destination</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return false;
  }
}

/**
 * Send password reset email
 * @param {string} email - Recipient email address
 * @param {string} code - Reset code
 * @param {string} name - User's name
 * @returns {Promise<boolean>} True if email sent successfully
 */
export async function sendPasswordResetEmail(email, code, name = "User") {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || "Coffee Shop <noreply@coffeeshop.com>",
      to: email,
      subject: "Password Reset - Coffee Shop",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6F4E37;">Password Reset Request</h2>
          <p>Hi ${name},</p>
          <p>We received a request to reset your password. Use the following code to reset your password:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #6F4E37; letter-spacing: 5px; margin: 0;">${code}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #888; font-size: 12px;">Coffee Shop - Your favorite coffee destination</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
}

/**
 * Generate a random 6-digit OTP code
 * @returns {string} 6-digit OTP code
 */
export function generateOtpCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Calculate OTP expiration time (10 minutes from now)
 * @returns {Date} Expiration date
 */
export function getOtpExpiration() {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);
  return expiresAt;
}

