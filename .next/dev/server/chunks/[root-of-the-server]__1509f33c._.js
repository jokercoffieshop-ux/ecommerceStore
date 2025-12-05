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
"[externals]/formidable [external] (formidable, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("formidable");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/cloudinary [external] (cloudinary, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("cloudinary", () => require("cloudinary"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

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
 * File Upload Utility Functions with Cloudinary
 * Handles file uploads using formidable and Cloudinary
 * Fixed for Windows compatibility
 */ __turbopack_context__.s([
    "config",
    ()=>config,
    "deleteFromCloudinary",
    ()=>deleteFromCloudinary,
    "extractPublicId",
    ()=>extractPublicId,
    "getCloudinaryUrl",
    ()=>getCloudinaryUrl,
    "parseForm",
    ()=>parseForm,
    "uploadToCloudinary",
    ()=>uploadToCloudinary
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/formidable [external] (formidable, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$cloudinary__$5b$external$5d$__$28$cloudinary$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/cloudinary [external] (cloudinary, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
// Configure Cloudinary
__TURBOPACK__imported__module__$5b$externals$5d2f$cloudinary__$5b$external$5d$__$28$cloudinary$2c$__cjs$29$__["v2"].config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
/**
 * Get temp directory (works on Windows, Linux, Mac)
 */ function getTempDir() {
    // Use OS temp directory instead of /tmp
    const tempDir = __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].tmpdir();
    // Create a subdirectory for uploads if it doesn't exist
    const uploadDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(tempDir, 'uploads');
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(uploadDir)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(uploadDir, {
            recursive: true
        });
    }
    return uploadDir;
}
async function parseForm(req, options = {}) {
    const { folder = "avatars", maxFileSize = 5 * 1024 * 1024, allowedFormats = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp"
    ] } = options;
    const uploadDir = getTempDir();
    const form = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$formidable__$5b$external$5d$__$28$formidable$2c$__esm_import$29$__["default"])({
        keepExtensions: true,
        maxFileSize,
        multiples: false,
        uploadDir,
        filename: (name, ext, part)=>{
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            return `temp-${uniqueSuffix}${ext}`;
        }
    });
    return new Promise((resolve, reject)=>{
        form.parse(req, async (err, fields, files)=>{
            if (err) {
                console.error("Formidable parse error:", err);
                reject(err);
                return;
            }
            try {
                // Normalize fields
                const normalizedFields = {};
                if (fields && typeof fields === "object") {
                    Object.keys(fields).forEach((key)=>{
                        const value = fields[key];
                        normalizedFields[key] = Array.isArray(value) ? value[0] : value;
                    });
                }
                // Normalize files
                const normalizedFiles = {};
                if (files && typeof files === "object") {
                    Object.keys(files).forEach((key)=>{
                        const value = files[key];
                        normalizedFiles[key] = Array.isArray(value) ? value[0] : value;
                    });
                }
                // Upload files to Cloudinary
                const cloudinaryResults = {};
                for (const [key, file] of Object.entries(normalizedFiles)){
                    if (file && file.filepath) {
                        try {
                            // Verify file exists before uploading
                            if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(file.filepath)) {
                                console.error(`File not found: ${file.filepath}`);
                                continue;
                            }
                            const result = await uploadToCloudinary(file, {
                                folder,
                                allowedFormats
                            });
                            cloudinaryResults[key] = result;
                            // Delete temp file after successful upload
                            try {
                                __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(file.filepath);
                            } catch (unlinkError) {
                                console.error(`Error deleting temp file: ${file.filepath}`, unlinkError);
                            }
                        } catch (uploadError) {
                            console.error(`Error uploading ${key} to Cloudinary:`, uploadError);
                            // Clean up temp file even on error
                            if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(file.filepath)) {
                                try {
                                    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(file.filepath);
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
                    cloudinaryResults
                });
            } catch (error) {
                console.error("Error processing files:", error);
                reject(error);
            }
        });
    });
}
async function uploadToCloudinary(file, options = {}) {
    const { folder = "avatars", allowedFormats = [
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp"
    ], transformation = {} } = options;
    // Default transformations for avatars
    const defaultTransformation = {
        width: 500,
        height: 500,
        crop: "fill",
        gravity: "face",
        quality: "auto",
        fetch_format: "auto"
    };
    return new Promise((resolve, reject)=>{
        // Verify file exists
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(file.filepath)) {
            reject(new Error(`File not found: ${file.filepath}`));
            return;
        }
        __TURBOPACK__imported__module__$5b$externals$5d2f$cloudinary__$5b$external$5d$__$28$cloudinary$2c$__cjs$29$__["v2"].uploader.upload(file.filepath, {
            folder,
            allowed_formats: allowedFormats,
            transformation: {
                ...defaultTransformation,
                ...transformation
            },
            resource_type: "auto"
        }, (error, result)=>{
            if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
                return;
            }
            resolve(result);
        });
    });
}
async function deleteFromCloudinary(publicId) {
    try {
        if (!publicId) {
            throw new Error("Public ID is required");
        }
        const result = await __TURBOPACK__imported__module__$5b$externals$5d2f$cloudinary__$5b$external$5d$__$28$cloudinary$2c$__cjs$29$__["v2"].uploader.destroy(publicId);
        console.log(`Deleted from Cloudinary: ${publicId}`, result);
        return result;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        throw error;
    }
}
function getCloudinaryUrl(cloudinaryResult, transformation = {}) {
    if (!cloudinaryResult || !cloudinaryResult.public_id) {
        return null;
    }
    // Generate URL with optional transformations
    return __TURBOPACK__imported__module__$5b$externals$5d2f$cloudinary__$5b$external$5d$__$28$cloudinary$2c$__cjs$29$__["v2"].url(cloudinaryResult.public_id, {
        secure: true,
        ...transformation
    });
}
function extractPublicId(url) {
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
const config = {
    api: {
        bodyParser: false
    }
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Downloads/coffe-project/pages/api/categories/index.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * GET /api/categories - عرض كل الفئات
 * POST /api/categories - إضافة فئة جديدة (Admin only)
 */ __turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/prisma.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/jwt.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/upload.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const config = {
    api: {
        bodyParser: false
    }
};
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
 * GET - عرض كل الفئات
 * يمكن للجميع الوصول
 */ async function handleGet(req, res) {
    try {
        const { active } = req.query;
        const where = {};
        if (active === "true") {
            where.isActive = true;
        }
        const categories = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].category.findMany({
            where,
            orderBy: [
                {
                    order: "asc"
                },
                {
                    createdAt: "desc"
                }
            ],
            include: {
                _count: {
                    select: {
                        products: true
                    }
                }
            }
        });
        return res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء جلب الفئات",
            error: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        });
    }
}
/**
 * POST - إضافة فئة جديدة
 * Admin only
 */ async function handlePost(req, res) {
    let uploadedPublicId = null;
    try {
        // التحقق من المصادقة والصلاحيات
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["authenticateUser"])(req);
        if (!authResult.success) {
            return res.status(401).json(authResult);
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hasRole"])(authResult.user, [
            "ADMIN"
        ])) {
            return res.status(403).json({
                success: false,
                message: "غير مصرح لك بإضافة فئات"
            });
        }
        // تحليل البيانات والرفع إلى Cloudinary
        const { fields, files, cloudinaryResults } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__["parseForm"])(req, {
            folder: "categories",
            maxFileSize: 5 * 1024 * 1024,
            allowedFormats: [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "webp"
            ]
        });
        const { nameAr, nameEn, descriptionAr, descriptionEn, isActive, order } = fields;
        // التحقق من البيانات المطلوبة
        if (!nameAr) {
            // حذف الصورة المرفوعة إذا كانت موجودة
            if (cloudinaryResults.image?.public_id) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__["deleteFromCloudinary"])(cloudinaryResults.image.public_id);
            }
            return res.status(400).json({
                success: false,
                message: "الاسم بالعربية مطلوب"
            });
        }
        // معالجة الصورة من Cloudinary
        let imageUrl = null;
        let imagePublicId = null;
        if (cloudinaryResults.image) {
            uploadedPublicId = cloudinaryResults.image.public_id;
            imageUrl = cloudinaryResults.image.secure_url || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__["getCloudinaryUrl"])(cloudinaryResults.image);
            imagePublicId = uploadedPublicId;
        }
        // إنشاء الفئة
        const category = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].category.create({
            data: {
                nameAr,
                nameEn: nameEn || null,
                descriptionAr: descriptionAr || null,
                descriptionEn: descriptionEn || null,
                imageUrl,
                imagePublicId,
                isActive: isActive === "true" || isActive === true,
                order: order ? parseInt(order) : 0
            }
        });
        return res.status(201).json({
            success: true,
            message: "تم إضافة الفئة بنجاح",
            category
        });
    } catch (error) {
        console.error("Error creating category:", error);
        // حذف الصورة المرفوعة في حالة حدوث خطأ
        if (uploadedPublicId) {
            try {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$upload$2e$js__$5b$api$5d$__$28$ecmascript$29$__["deleteFromCloudinary"])(uploadedPublicId);
            } catch (cleanupError) {
                console.error("Error cleaning up uploaded image:", cleanupError);
            }
        }
        return res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء إضافة الفئة",
            error: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1509f33c._.js.map