/**
 * POST /api/auth/register
 * Register a new user with name, email, password, optional phone and avatar
 */

import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";
import { parseForm, getFileUrl } from "../../../lib/upload";
import { validate, registerSchema, validateImageFile } from "../../../lib/validation";
import { generateOtpCode, getOtpExpiration, sendOtpEmail } from "../../../lib/email";

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Parse form data (including file upload)
    const { fields, files } = await parseForm(req);

    console.log("Parsed fields:", fields);
    console.log("Parsed files:", files);

    // Validate input data
    const validation = validate(registerSchema, {
      name: fields.name || "",
      email: fields.email || "",
      password: fields.password || "",
      phone: fields.phone || "",
    });

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { name, email, password, phone } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Validate avatar file if provided
    let avatarUrl = null;
    if (files.avatar) {
      const fileValidation = validateImageFile(files.avatar);
      if (!fileValidation.valid) {
        return res.status(400).json({
          success: false,
          message: fileValidation.error,
        });
      }
      avatarUrl = getFileUrl(files.avatar);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        avatarUrl,
        role: "CLIENT", // Default role
        isVerified: false,
      },
    });

    // Generate OTP for email verification
    const otpCode = generateOtpCode();
    const expiresAt = getOtpExpiration();

    await prisma.otp.create({
      data: {
        userId: user.id,
        code: otpCode,
        expiresAt,
      },
    });

    // Send OTP email
    await sendOtpEmail(email, otpCode, name);

    // Return success response (don't include password)
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email for verification code.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

