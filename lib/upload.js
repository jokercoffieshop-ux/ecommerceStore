/**
 * File Upload Utility Functions with Cloudinary
 * Handles file uploads using formidable and Cloudinary
 * Fixed for Windows compatibility
 */

import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import os from "os";
import path from "path";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Get temp directory (works on Windows, Linux, Mac)
 */
function getTempDir() {
  // Use OS temp directory instead of /tmp
  const tempDir = os.tmpdir();
  
  // Create a subdirectory for uploads if it doesn't exist
  const uploadDir = path.join(tempDir, 'uploads');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  return uploadDir;
}

/**
 * Parse form data including files and upload to Cloudinary
 * @param {Object} req - Next.js API request object
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} { fields, files, cloudinaryResults }
 */
export async function parseForm(req, options = {}) {
  const {
    folder = "avatars", // Cloudinary folder
    maxFileSize = 5 * 1024 * 1024, // 5MB
    allowedFormats = ["jpg", "jpeg", "png", "gif", "webp"],
  } = options;

  const uploadDir = getTempDir();

  const form = formidable({
    keepExtensions: true,
    maxFileSize,
    multiples: false,
    uploadDir, // Use cross-platform temp directory
    filename: (name, ext, part) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `temp-${uniqueSuffix}${ext}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable parse error:", err);
        reject(err);
        return;
      }

      try {
        // Normalize fields
        const normalizedFields = {};
        if (fields && typeof fields === "object") {
          Object.keys(fields).forEach((key) => {
            const value = fields[key];
            normalizedFields[key] = Array.isArray(value) ? value[0] : value;
          });
        }

        // Normalize files
        const normalizedFiles = {};
        if (files && typeof files === "object") {
          Object.keys(files).forEach((key) => {
            const value = files[key];
            normalizedFiles[key] = Array.isArray(value) ? value[0] : value;
          });
        }

        // Upload files to Cloudinary
        const cloudinaryResults = {};
        for (const [key, file] of Object.entries(normalizedFiles)) {
          if (file && file.filepath) {
            try {
              // Verify file exists before uploading
              if (!fs.existsSync(file.filepath)) {
                console.error(`File not found: ${file.filepath}`);
                continue;
              }

              const result = await uploadToCloudinary(file, {
                folder,
                allowedFormats,
              });
              cloudinaryResults[key] = result;

              // Delete temp file after successful upload
              try {
                fs.unlinkSync(file.filepath);
              } catch (unlinkError) {
                console.error(`Error deleting temp file: ${file.filepath}`, unlinkError);
              }
            } catch (uploadError) {
              console.error(`Error uploading ${key} to Cloudinary:`, uploadError);
              // Clean up temp file even on error
              if (fs.existsSync(file.filepath)) {
                try {
                  fs.unlinkSync(file.filepath);
                } catch (unlinkError) {
                  console.error(`Error deleting temp file after upload error:`, unlinkError);
                }
              }
            }
          }
        }

        resolve({
          fields: normalizedFields,
          files: normalizedFiles,
          cloudinaryResults,
        });
      } catch (error) {
        console.error("Error processing files:", error);
        reject(error);
      }
    });
  });
}

/**
 * Upload a single file to Cloudinary
 * @param {Object} file - File object from formidable
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} Cloudinary upload result
 */
export async function uploadToCloudinary(file, options = {}) {
  const {
    folder = "avatars",
    allowedFormats = ["jpg", "jpeg", "png", "gif", "webp"],
    transformation = {},
  } = options;

  // Default transformations for avatars
  const defaultTransformation = {
    width: 500,
    height: 500,
    crop: "fill",
    gravity: "face",
    quality: "auto",
    fetch_format: "auto",
  };

  return new Promise((resolve, reject) => {
    // Verify file exists
    if (!fs.existsSync(file.filepath)) {
      reject(new Error(`File not found: ${file.filepath}`));
      return;
    }

    cloudinary.uploader.upload(
      file.filepath,
      {
        folder,
        allowed_formats: allowedFormats,
        transformation: { ...defaultTransformation, ...transformation },
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
          return;
        }
        resolve(result);
      }
    );
  });
}

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteFromCloudinary(publicId) {
  try {
    if (!publicId) {
      throw new Error("Public ID is required");
    }

    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted from Cloudinary: ${publicId}`, result);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
}

/**
 * Get optimized URL from Cloudinary result
 * @param {Object} cloudinaryResult - Result from Cloudinary upload
 * @param {Object} transformation - Optional transformation options
 * @returns {string} Optimized URL
 */
export function getCloudinaryUrl(cloudinaryResult, transformation = {}) {
  if (!cloudinaryResult || !cloudinaryResult.public_id) {
    return null;
  }

  // Generate URL with optional transformations
  return cloudinary.url(cloudinaryResult.public_id, {
    secure: true,
    ...transformation,
  });
}

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string} Public ID
 */
export function extractPublicId(url) {
  if (!url) return null;

  try {
    // Extract public_id from Cloudinary URL
    // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/folder/image.jpg
    const matches = url.match(/\/v\d+\/(.+)\.[^.]+$/);
    if (matches && matches[1]) {
      return matches[1];
    }

    // Fallback: extract after /upload/
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex !== -1) {
      const afterUpload = url.substring(uploadIndex + 8);
      const withoutVersion = afterUpload.replace(/^v\d+\//, "");
      return withoutVersion.replace(/\.[^.]+$/, "");
    }

    return null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
}

/**
 * Disable body parser for Next.js API routes that handle file uploads
 */
export const config = {
  api: {
    bodyParser: false,
  },
};