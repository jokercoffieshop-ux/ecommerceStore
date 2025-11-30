/**
 * File Upload Utility Functions
 * Handles file uploads using formidable
 */

import formidable from "formidable";
import fs from "fs";
import path from "path";

/**
 * Parse form data including files
 * @param {Object} req - Next.js API request object
 * @returns {Promise<Object>} { fields, files }
 */
export async function parseForm(req) {
  const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");

  // Create upload directory if it doesn't exist
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    multiples: false, // Don't allow multiple files
    filename: (name, ext, part) => {
      // Generate unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return `avatar-${uniqueSuffix}${ext}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Formidable parse error:", err);
        reject(err);
        return;
      }

      console.log("Raw fields from formidable:", fields);
      console.log("Raw files from formidable:", files);

      // Formidable v3 returns arrays for fields and files
      // Convert to single values for easier handling
      const normalizedFields = {};
      if (fields && typeof fields === 'object') {
        Object.keys(fields).forEach((key) => {
          const value = fields[key];
          normalizedFields[key] = Array.isArray(value) ? value[0] : value;
        });
      }

      const normalizedFiles = {};
      if (files && typeof files === 'object') {
        Object.keys(files).forEach((key) => {
          const value = files[key];
          normalizedFiles[key] = Array.isArray(value) ? value[0] : value;
        });
      }

      console.log("Normalized fields:", normalizedFields);
      console.log("Normalized files:", normalizedFiles);

      resolve({ fields: normalizedFields, files: normalizedFiles });
    });
  });
}

/**
 * Delete a file from the filesystem
 * @param {string} filePath - Path to file (relative to public directory)
 * @returns {boolean} True if deleted successfully
 */
export function deleteFile(filePath) {
  try {
    if (!filePath) return false;

    // Extract path after /uploads/
    const relativePath = filePath.replace(/^\/uploads\//, "");
    const fullPath = path.join(process.cwd(), "public", "uploads", relativePath);

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted file: ${fullPath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting file:", error);
    return false;
  }
}

/**
 * Get public URL for uploaded file
 * @param {Object} file - File object from formidable
 * @returns {string} Public URL path
 */
export function getFileUrl(file) {
  if (!file || !file.newFilename) return null;
  return `/uploads/avatars/${file.newFilename}`;
}

/**
 * Disable body parser for Next.js API routes that handle file uploads
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

