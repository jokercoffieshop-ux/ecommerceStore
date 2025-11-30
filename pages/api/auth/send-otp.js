/**
 * POST /api/auth/send-otp
 * Send OTP code to user's email for verification or password reset
 */

import prisma from "../../../lib/prisma";
import { validate, sendOtpSchema } from "../../../lib/validation";
import { generateOtpCode, getOtpExpiration, sendOtpEmail, sendPasswordResetEmail } from "../../../lib/email";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Validate input data
    const validation = validate(sendOtpSchema, req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email, type = "registration" } = validation.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // For registration OTP, user must exist but not be verified
    if (type === "registration") {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: "Email is already verified",
        });
      }
    }

    // For password reset, user must exist
    if (type === "password-reset") {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    }

    // Delete any existing OTPs for this user
    await prisma.otp.deleteMany({
      where: { userId: user.id },
    });

    // Generate new OTP
    const otpCode = generateOtpCode();
    const expiresAt = getOtpExpiration();

    await prisma.otp.create({
      data: {
        userId: user.id,
        code: otpCode,
        expiresAt,
      },
    });

    // Send appropriate email based on type
    let emailSent = false;
    if (type === "password-reset") {
      emailSent = await sendPasswordResetEmail(email, otpCode, user.name);
    } else {
      emailSent = await sendOtpEmail(email, otpCode, user.name);
    }

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully. Please check your email.",
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

