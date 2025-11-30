/**
 * JWT Utility Functions
 * Handles JWT token generation and verification for authentication
 */

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = "7d"; // Token expires in 7 days

/**
 * Generate a JWT token for a user
 * @param {Object} payload - User data to encode in token (id, email, role)
 * @returns {string} JWT token
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
}

/**
 * Extract token from request cookies or Authorization header
 * @param {Object} req - Next.js API request object
 * @returns {string|null} Token string or null
 */
export function extractToken(req) {
  // Check cookies first
  const cookieToken = req.cookies?.token;
  if (cookieToken) return cookieToken;

  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  return null;
}

/**
 * Middleware to verify user authentication
 * @param {Object} req - Next.js API request object
 * @returns {Object} Authentication result with success flag and user data
 */
export async function authenticateUser(req) {
  const token = extractToken(req);

  if (!token) {
    return {
      success: false,
      message: "غير مصرح - لم يتم العثور على رمز المصادقة",
    };
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return {
      success: false,
      message: "غير مصرح - رمز المصادقة غير صالح",
    };
  }

  return {
    success: true,
    user: decoded,
  };
}

/**
 * Check if user has required role
 * @param {Object} user - User object with role property
 * @param {string|string[]} allowedRoles - Single role or array of allowed roles
 * @returns {boolean} True if user has required role
 */
export function hasRole(user, allowedRoles) {
  if (!user || !user.role) return false;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.includes(user.role);
}

