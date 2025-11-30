/**
 * GET /api/user/profile - Get current user profile
 * PUT /api/user/profile - Update user profile (name, phone, avatar)
 */

import prisma from "../../../lib/prisma";
import { authenticateUser } from "../../../lib/jwt";
import { parseForm, getFileUrl, deleteFile } from "../../../lib/upload";
import { validate, updateProfileSchema, validateImageFile } from "../../../lib/validation";

export default async function handler(req, res) {
  // Authenticate user
  const authResult = await authenticateUser(req);

  if (!authResult.success) {
    return res.status(401).json(authResult);
  }

  const user = authResult.user;

  // GET - Fetch user profile
  if (req.method === "GET") {
    try {
      const userProfile = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          phone: true,
          role: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!userProfile) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        user: userProfile,
      });
    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // PUT - Update user profile
  if (req.method === "PUT") {
    try {
      // Check if request contains file upload
      const contentType = req.headers["content-type"] || "";
      let fields = {};
      let files = {};

      if (contentType.includes("multipart/form-data")) {
        // Parse form data with file upload
        const parsed = await parseForm(req);
        fields = parsed.fields;
        files = parsed.files;
      } else {
        // Regular JSON body
        fields = req.body;
      }

      // Validate input data
      const validation = validate(updateProfileSchema, {
        name: fields.name,
        phone: fields.phone || "",
      });

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validation.errors,
        });
      }

      const updateData = {};

      // Add validated fields to update data
      if (validation.data.name) {
        updateData.name = validation.data.name;
      }

      if (validation.data.phone !== undefined) {
        updateData.phone = validation.data.phone || null;
      }

      // Handle avatar upload
      if (files.avatar) {
        const fileValidation = validateImageFile(files.avatar);
        if (!fileValidation.valid) {
          return res.status(400).json({
            success: false,
            message: fileValidation.error,
          });
        }

        // Get current user to delete old avatar
        const currentUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { avatarUrl: true },
        });

        // Delete old avatar if exists
        if (currentUser.avatarUrl) {
          deleteFile(currentUser.avatarUrl);
        }

        // Set new avatar URL
        updateData.avatarUrl = getFileUrl(files.avatar);
      }

      // Update user profile
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          phone: true,
          role: true,
          isVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Update profile error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

