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
"[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("jsonwebtoken", () => require("jsonwebtoken"));

module.exports = mod;
}),
"[project]/Downloads/coffe-project/lib/jwt.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * JWT Utility Functions
 * Handles JWT token generation and verification for authentication
 */ __turbopack_context__.s([
    "authenticateUser",
    ()=>authenticateUser,
    "extractToken",
    ()=>extractToken,
    "generateToken",
    ()=>generateToken,
    "hasRole",
    ()=>hasRole,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/jsonwebtoken [external] (jsonwebtoken, cjs)");
;
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // Token expires in 7 days
function generateToken(payload) {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__["default"].sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    });
}
function verifyToken(token) {
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$jsonwebtoken__$5b$external$5d$__$28$jsonwebtoken$2c$__cjs$29$__["default"].verify(token, JWT_SECRET);
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        return null;
    }
}
function extractToken(req) {
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
async function authenticateUser(req) {
    const token = extractToken(req);
    if (!token) {
        return {
            success: false,
            message: "غير مصرح - لم يتم العثور على رمز المصادقة"
        };
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return {
            success: false,
            message: "غير مصرح - رمز المصادقة غير صالح"
        };
    }
    return {
        success: true,
        user: decoded
    };
}
function hasRole(user, allowedRoles) {
    if (!user || !user.role) return false;
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [
        allowedRoles
    ];
    return roles.includes(user.role);
}
}),
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
"[project]/Downloads/coffe-project/pages/api/orders/index.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * GET /api/orders - عرض كل الطلبات (Admin/Staff) أو طلبات المستخدم (Client)
 * POST /api/orders - إنشاء طلب جديد من السلة
 */ __turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/prisma.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/jwt.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/validation.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
async function handler(req, res) {
    if (req.method === "GET") {
        return handleGet(req, res);
    } else if (req.method === "POST") {
        return handlePost(req, res);
    }
    return res.status(405).json({
        success: false,
        message: "Method not allowed"
    });
}
/**
 * GET - عرض الطلبات
 * Admin/Staff: كل الطلبات
 * Client: طلباته فقط
 */ async function handleGet(req, res) {
    try {
        // التحقق من المصادقة
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["authenticateUser"])(req);
        if (!authResult.success) {
            return res.status(401).json(authResult);
        }
        const user = authResult.user;
        const { status, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = req.query;
        // بناء شروط البحث
        const where = {};
        // إذا كان عميل، عرض طلباته فقط
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hasRole"])(user, [
            "ADMIN",
            "STAFF"
        ])) {
            where.userId = user.id;
        }
        if (status) {
            where.status = status;
        }
        // حساب الصفحات
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        // جلب الطلبات
        const [orders, total] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].order.findMany({
                where,
                skip,
                take,
                orderBy: {
                    [sortBy]: sortOrder
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    nameAr: true,
                                    nameEn: true,
                                    imageUrl: true
                                }
                            }
                        }
                    }
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].order.count({
                where
            })
        ]);
        return res.status(200).json({
            success: true,
            orders,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء جلب الطلبات",
            error: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        });
    }
}
/**
 * POST - إنشاء طلب جديد من السلة
 */ async function handlePost(req, res) {
    try {
        // التحقق من المصادقة
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["authenticateUser"])(req);
        if (!authResult.success) {
            return res.status(401).json(authResult);
        }
        const userId = authResult.user.id;
        // التحقق من صحة البيانات
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__["validate"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$validation$2e$js__$5b$api$5d$__$28$ecmascript$29$__["createOrderSchema"], req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "بيانات الطلب غير صحيحة",
                errors: validation.errors
            });
        }
        const { customerName, customerPhone, customerEmail, address, city, notes, paymentMethod = "CASH" } = validation.data;
        // جلب السلة مع العناصر
        const cart = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].cart.findUnique({
            where: {
                userId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "السلة فارغة"
            });
        }
        // التحقق من توفر المنتجات والمخزون
        for (const item of cart.items){
            if (!item.product.isAvailable) {
                return res.status(400).json({
                    success: false,
                    message: `المنتج "${item.product.nameAr}" غير متوفر حالياً`
                });
            }
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `الكمية المتوفرة من "${item.product.nameAr}": ${item.product.stock}`
                });
            }
        }
        // حساب الإجمالي
        const totalAmount = cart.items.reduce((sum, item)=>{
            return sum + parseFloat(item.product.price) * item.quantity;
        }, 0);
        // توليد رقم الطلب
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        // إنشاء الطلب مع العناصر في معاملة واحدة
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].$transaction(async (tx)=>{
            // إنشاء الطلب
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    orderNumber,
                    status: "PENDING",
                    paymentMethod,
                    totalAmount,
                    customerName,
                    customerPhone,
                    customerEmail: customerEmail || authResult.user.email,
                    address,
                    city: city || null,
                    notes: notes || null
                }
            });
            // إنشاء عناصر الطلب
            const orderItems = await Promise.all(cart.items.map((item)=>tx.orderItem.create({
                    data: {
                        orderId: newOrder.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.product.price,
                        nameAr: item.product.nameAr
                    }
                })));
            // تحديث المخزون
            await Promise.all(cart.items.map((item)=>tx.product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                })));
            // تفريغ السلة
            await tx.cartItem.deleteMany({
                where: {
                    cartId: cart.id
                }
            });
            return {
                ...newOrder,
                items: orderItems
            };
        });
        return res.status(201).json({
            success: true,
            message: "تم إنشاء الطلب بنجاح",
            order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء إنشاء الطلب",
            error: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e0d67073._.js.map