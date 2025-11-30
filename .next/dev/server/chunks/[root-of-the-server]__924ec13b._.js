module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[externals]/@prisma/adapter-pg [external] (@prisma/adapter-pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("@prisma/adapter-pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Downloads/coffe-project/lib/prisma.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@prisma/adapter-pg [external] (@prisma/adapter-pg, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices
const globalForPrisma = /*TURBOPACK member replacement*/ __turbopack_context__.g;
let prisma;
if (!globalForPrisma.prisma) {
    const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["default"].Pool({
        connectionString: process.env.DATABASE_URL
    });
    const adapter = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$adapter$2d$pg__$5b$external$5d$__$2840$prisma$2f$adapter$2d$pg$2c$__esm_import$29$__["PrismaPg"](pool);
    prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
        adapter
    });
    if ("TURBOPACK compile-time truthy", 1) {
        globalForPrisma.prisma = prisma;
    }
} else {
    prisma = globalForPrisma.prisma;
}
const __TURBOPACK__default__export__ = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/bcrypt [external] (bcrypt, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("bcrypt", () => require("bcrypt"));

module.exports = mod;
}),
"[externals]/formidable [external] (formidable, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("formidable");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/Downloads/coffe-project/lib/upload.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * File Upload Utility Functions
 * Handles file uploads using formidable
 */ __turbopack_context__.s([
    "config",
    ()=>config,
    "deleteFile",
    ()=>deleteFile,
    "getFileUrl",
    ()=>getFileUrl,
    "parseForm",
    ()=>parseForm
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/formidable [external] (formidable, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function parseForm(req) {
    const uploadDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "uploads", "avatars");
    // Create upload directory if it doesn't exist
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(uploadDir)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(uploadDir, {
            recursive: true
        });
    }
    const form = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__["default"])({
        uploadDir,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024,
        multiples: false,
        filename: (name, ext, part)=>{
            // Generate unique filename
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            return `avatar-${uniqueSuffix}${ext}`;
        }
    });
    return new Promise((resolve, reject)=>{
        form.parse(req, (err, fields, files)=>{
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
                Object.keys(fields).forEach((key)=>{
                    const value = fields[key];
                    normalizedFields[key] = Array.isArray(value) ? value[0] : value;
                });
            }
            const normalizedFiles = {};
            if (files && typeof files === 'object') {
                Object.keys(files).forEach((key)=>{
                    const value = files[key];
                    normalizedFiles[key] = Array.isArray(value) ? value[0] : value;
                });
            }
            console.log("Normalized fields:", normalizedFields);
            console.log("Normalized files:", normalizedFiles);
            resolve({
                fields: normalizedFields,
                files: normalizedFiles
            });
        });
    });
}
function deleteFile(filePath) {
    try {
        if (!filePath) return false;
        // Extract path after /uploads/
        const relativePath = filePath.replace(/^\/uploads\//, "");
        const fullPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "uploads", relativePath);
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(fullPath)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(fullPath);
            console.log(`Deleted file: ${fullPath}`);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error deleting file:", error);
        return false;
    }
}
function getFileUrl(file) {
    if (!file || !file.newFilename) return null;
    return `/uploads/avatars/${file.newFilename}`;
}
const config = {
    api: {
        bodyParser: false
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/zod [external] (zod, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("zod");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/Downloads/coffe-project/lib/validation.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * Validation Utility Functions
 * Handles input validation using Zod schemas
 */ __turbopack_context__.s([
    "createOrderSchema",
    ()=>createOrderSchema,
    "loginSchema",
    ()=>loginSchema,
    "otpSchema",
    ()=>otpSchema,
    "registerSchema",
    ()=>registerSchema,
    "resetPasswordSchema",
    ()=>resetPasswordSchema,
    "sanitizeInput",
    ()=>sanitizeInput,
    "sendOtpSchema",
    ()=>sendOtpSchema,
    "updateProfileSchema",
    ()=>updateProfileSchema,
    "validate",
    ()=>validate,
    "validateImageFile",
    ()=>validateImageFile
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/zod [external] (zod, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
/**
 * Egyptian phone number validation regex
 * Accepts: +201012345678 or 01012345678
 * Format: +20 followed by 10 digits starting with 1
 */ const egyptianPhoneRegex = /^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/;
const registerSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100, "الاسم يجب أن يكون أقل من 100 حرف"),
    email: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().email({
        message: "صيغة البريد الإلكتروني غير صحيحة"
    }).transform((val)=>val.toLowerCase()),
    password: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").regex(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل").regex(/[a-z]/, "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل").regex(/[0-9]/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل"),
    phone: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)").optional().or(__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].literal(""))
});
const loginSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().email({
        message: "Invalid email format"
    }).transform((val)=>val.toLowerCase()),
    password: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(1, "Password is required")
});
const otpSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().email({
        message: "Invalid email format"
    }).transform((val)=>val.toLowerCase()),
    code: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().length(6, "OTP code must be 6 digits")
});
const sendOtpSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().email({
        message: "Invalid email format"
    }).transform((val)=>val.toLowerCase()),
    type: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].enum([
        "registration",
        "password-reset"
    ]).optional()
});
const updateProfileSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100, "الاسم يجب أن يكون أقل من 100 حرف").optional(),
    phone: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)").optional().or(__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].literal("")),
    avatarUrl: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().url({
        message: "صيغة الرابط غير صحيحة"
    }).optional()
});
const createOrderSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
    customerName: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(2, "الاسم يجب أن يكون حرفين على الأقل").max(100, "الاسم يجب أن يكون أقل من 100 حرف"),
    customerPhone: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)"),
    customerEmail: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().email({
        message: "صيغة البريد الإلكتروني غير صحيحة"
    }).optional().or(__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].literal("")),
    address: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(5, "العنوان يجب أن يكون 5 أحرف على الأقل").max(500, "العنوان يجب أن يكون أقل من 500 حرف"),
    city: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(2, "المدينة يجب أن تكون حرفين على الأقل").max(100, "المدينة يجب أن تكون أقل من 100 حرف").optional().or(__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].literal("")),
    notes: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().max(1000, "الملاحظات يجب أن تكون أقل من 1000 حرف").optional().or(__TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].literal("")),
    paymentMethod: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].enum([
        "CASH",
        "CARD",
        "WALLET"
    ], {
        errorMap: ()=>({
                message: "طريقة الدفع غير صحيحة"
            })
    }).optional()
});
const resetPasswordSchema = __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().email({
        message: "صيغة البريد الإلكتروني غير صحيحة"
    }).transform((val)=>val.toLowerCase()),
    code: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().length(6, "رمز التحقق يجب أن يكون 6 أرقام"),
    newPassword: __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").regex(/[A-Z]/, "كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل").regex(/[a-z]/, "كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل").regex(/[0-9]/, "كلمة المرور يجب أن تحتوي على رقم واحد على الأقل")
});
function validate(schema, data) {
    try {
        const validatedData = schema.parse(data);
        return {
            success: true,
            data: validatedData
        };
    } catch (error) {
        console.error("Validation error:", error);
        if (error instanceof __TURBOPACK__imported__module__$5b$externals$5d2f$zod__$5b$external$5d$__$28$zod$2c$__esm_import$29$__["z"].ZodError) {
            const errors = {};
            if (error.errors && Array.isArray(error.errors)) {
                error.errors.forEach((err)=>{
                    const path = err.path.join(".");
                    errors[path] = err.message;
                });
            }
            return {
                success: false,
                errors
            };
        }
        return {
            success: false,
            errors: {
                general: "Validation failed"
            }
        };
    }
}
function validateImageFile(file) {
    if (!file) {
        return {
            valid: false,
            error: "No file provided"
        };
    }
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return {
            valid: false,
            error: "File size must be less than 5MB"
        };
    }
    // Check file type
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp"
    ];
    if (!allowedTypes.includes(file.mimetype || file.type)) {
        return {
            valid: false,
            error: "File must be an image (JPEG, PNG, GIF, or WebP)"
        };
    }
    return {
        valid: true
    };
}
function sanitizeInput(input) {
    if (typeof input !== "string") return input;
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/nodemailer [external] (nodemailer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("nodemailer", () => require("nodemailer"));

module.exports = mod;
}),
"[project]/Downloads/coffe-project/lib/email.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Email Utility Functions
 * Handles sending emails for OTP verification and password reset
 */ __turbopack_context__.s([
    "generateOtpCode",
    ()=>generateOtpCode,
    "getOtpExpiration",
    ()=>getOtpExpiration,
    "sendOtpEmail",
    ()=>sendOtpEmail,
    "sendPasswordResetEmail",
    ()=>sendPasswordResetEmail
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$nodemailer__$5b$external$5d$__$28$nodemailer$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/nodemailer [external] (nodemailer, cjs)");
;
/**
 * Create email transporter using environment variables
 * @returns {Object} Nodemailer transporter
 */ function createTransporter() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$nodemailer__$5b$external$5d$__$28$nodemailer$2c$__cjs$29$__["default"].createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.EMAIL_PORT || "587"),
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}
async function sendOtpEmail(email, code, name = "User") {
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
      `
        };
        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${email}`);
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
}
async function sendPasswordResetEmail(email, code, name = "User") {
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
      `
        };
        await transporter.sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}`);
        return true;
    } catch (error) {
        console.error("Error sending password reset email:", error);
        return false;
    }
}
function generateOtpCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function getOtpExpiration() {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    return expiresAt;
}
}),
"[project]/Downloads/coffe-project/pages/api/auth/register.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * POST /api/auth/register
 * Register a new user with name, email, password, optional phone and avatar
 */ __turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/prisma.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/bcrypt [external] (bcrypt, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/upload.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/validation.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$email$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/email.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const config = {
    api: {
        bodyParser: false
    }
};
async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }
    try {
        // Parse form data (including file upload)
        const { fields, files } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__["parseForm"])(req);
        console.log("Parsed fields:", fields);
        console.log("Parsed files:", files);
        // Validate input data
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__["validate"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__["registerSchema"], {
            name: fields.name || "",
            email: fields.email || "",
            password: fields.password || "",
            phone: fields.phone || ""
        });
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validation.errors
            });
        }
        const { name, email, password, phone } = validation.data;
        // Check if user already exists
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        // Validate avatar file if provided
        let avatarUrl = null;
        if (files.avatar) {
            const fileValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__["validateImageFile"])(files.avatar);
            if (!fileValidation.valid) {
                return res.status(400).json({
                    success: false,
                    message: fileValidation.error
                });
            }
            avatarUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__["getFileUrl"])(files.avatar);
        }
        // Hash password
        const hashedPassword = await __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$29$__["default"].hash(password, 10);
        // Create user
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone: phone || null,
                avatarUrl,
                role: "CLIENT",
                isVerified: false
            }
        });
        // Generate OTP for email verification
        const otpCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$email$2e$js__$5b$api$5d$__$28$ecmascript$29$__["generateOtpCode"])();
        const expiresAt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$email$2e$js__$5b$api$5d$__$28$ecmascript$29$__["getOtpExpiration"])();
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].otp.create({
            data: {
                userId: user.id,
                code: otpCode,
                expiresAt
            }
        });
        // Send OTP email
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$email$2e$js__$5b$api$5d$__$28$ecmascript$29$__["sendOtpEmail"])(email, otpCode, name);
        // Return success response (don't include password)
        const { password: _, ...userWithoutPassword } = user;
        return res.status(201).json({
            success: true,
            message: "User registered successfully. Please check your email for verification code.",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__924ec13b._.js.map