/**
 * POST /api/auth/verify-otp
 * Verify OTP code and mark user as verified
 */

import prisma from "../../../lib/prisma";
import { validate, otpSchema } from "../../../lib/validation";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Validate input data
    const validation = validate(otpSchema, req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email, code } = validation.data;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        otps: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    // Check if OTP exists
    if (!user.otps || user.otps.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }

    const otp = user.otps[0];

    // Check if OTP has expired
    if (new Date() > new Date(otp.expiresAt)) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    // Verify OTP code
    if (otp.code !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP code",
      });
    }

    // Mark user as verified
    await prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true },
    });

    // Delete used OTP
    await prisma.otp.delete({
      where: { id: otp.id },
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

