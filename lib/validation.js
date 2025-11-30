/**
 * Validation Utility Functions
 * Handles input validation using Zod schemas
 */

import { z } from "zod";

/**
 * Egyptian phone number validation regex
 * Accepts: +201012345678 or 01012345678
 * Format: +20 followed by 10 digits starting with 1
 */
const egyptianPhoneRegex = /^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/;

/**
 * User registration validation schema
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم يجب أن يكون أقل من 100 حرف"),
  email: z
    .string()
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" })
    .transform(val => val.toLowerCase()),
  password: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"),
  phone: z
    .string()
    .regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)")
    .optional()
    .or(z.literal("")),
});

/**
 * User login validation schema
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).transform(val => val.toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

/**
 * OTP verification validation schema
 */
export const otpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).transform(val => val.toLowerCase()),
  code: z.string().length(6, "OTP code must be 6 digits"),
});

/**
 * Send OTP validation schema
 */
export const sendOtpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).transform(val => val.toLowerCase()),
  type: z.enum(["registration", "password-reset"]).optional(),
});

/**
 * Profile update validation schema
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم يجب أن يكون أقل من 100 حرف")
    .optional(),
  phone: z
    .string()
    .regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)")
    .optional()
    .or(z.literal("")),
  avatarUrl: z.string().url({ message: "صيغة الرابط غير صحيحة" }).optional(),
});

/**
 * Order creation validation schema
 */
export const createOrderSchema = z.object({
  customerName: z
    .string()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم يجب أن يكون أقل من 100 حرف"),
  customerPhone: z
    .string()
    .regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)"),
  customerEmail: z
    .string()
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, "العنوان يجب أن يكون 5 أحرف على الأقل")
    .max(500, "العنوان يجب أن يكون أقل من 500 حرف"),
  city: z
    .string()
    .min(2, "المدينة يجب أن تكون حرفين على الأقل")
    .max(100, "المدينة يجب أن تكون أقل من 100 حرف")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .max(1000, "الملاحظات يجب أن تكون أقل من 1000 حرف")
    .optional()
    .or(z.literal("")),
  paymentMethod: z.enum(["CASH", "CARD", "WALLET"], {
    errorMap: () => ({ message: "طريقة الدفع غير صحيحة" }),
  }).optional(),
});

/**
 * Password reset validation schema
 */
export const resetPasswordSchema = z.object({
  email: z.string().email({ message: "صيغة البريد الإلكتروني غير صحيحة" }).transform(val => val.toLowerCase()),
  code: z.string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
  newPassword: z
    .string()
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .regex(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل")
    .regex(/[a-z]/, "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل")
    .regex(/[0-9]/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"),
});

/**
 * Validate data against a schema
 * @param {Object} schema - Zod schema
 * @param {Object} data - Data to validate
 * @returns {Object} { success: boolean, data?: Object, errors?: Object }
 */
export function validate(schema, data) {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    console.error("Validation error:", error);
    if (error instanceof z.ZodError) {
      const errors = {};
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          errors[path] = err.message;
        });
      }
      return { success: false, errors };
    }
    return { success: false, errors: { general: "Validation failed" } };
  }
}

/**
 * Validate file upload (image)
 * @param {Object} file - File object from formidable
 * @returns {Object} { valid: boolean, error?: string }
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: "No file provided" };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 5MB" };
  }

  // Check file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.mimetype || file.type)) {
    return { valid: false, error: "File must be an image (JPEG, PNG, GIF, or WebP)" };
  }

  return { valid: true };
}

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== "string") return input;
  
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

