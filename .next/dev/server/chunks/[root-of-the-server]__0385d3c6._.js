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
const JWT_EXPIRES_IN = "7d"; // Token expires in 7 days
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
"[project]/Downloads/coffe-project/pages/api/orders/[id]/status.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/**
 * PATCH /api/orders/[id]/status - تحديث حالة الطلب
 * Admin/Staff only
 */ __turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/prisma.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/lib/jwt.js [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const VALID_STATUSES = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "REFUNDED"
];
async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }
    const { id } = req.query;
    try {
        // التحقق من المصادقة والصلاحيات
        const authResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["authenticateUser"])(req);
        if (!authResult.success) {
            return res.status(401).json(authResult);
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$jwt$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hasRole"])(authResult.user, [
            "ADMIN",
            "STAFF"
        ])) {
            return res.status(403).json({
                success: false,
                message: "غير مصرح لك بتحديث حالة الطلبات"
            });
        }
        const { status } = req.body;
        // التحقق من الحالة
        if (!status || !VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `الحالة يجب أن تكون واحدة من: ${VALID_STATUSES.join(", ")}`
            });
        }
        // التحقق من وجود الطلب
        const existingOrder = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].order.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: "الطلب غير موجود"
            });
        }
        // إذا تم إلغاء الطلب، إرجاع المنتجات للمخزون
        if (status === "CANCELLED" && existingOrder.status !== "CANCELLED") {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].$transaction(existingOrder.items.map((item)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        stock: {
                            increment: item.quantity
                        }
                    }
                })));
        }
        // إذا تم استرجاع الطلب، إرجاع المنتجات للمخزون
        if (status === "REFUNDED" && existingOrder.status !== "REFUNDED" && existingOrder.status !== "CANCELLED") {
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].$transaction(existingOrder.items.map((item)=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        stock: {
                            increment: item.quantity
                        }
                    }
                })));
        }
        // تحديث حالة الطلب
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$lib$2f$prisma$2e$js__$5b$api$5d$__$28$ecmascript$29$__["default"].order.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status
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
        });
        return res.status(200).json({
            success: true,
            message: "تم تحديث حالة الطلب بنجاح",
            order,
            previousStatus: existingOrder.status,
            newStatus: status
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).json({
            success: false,
            message: "حدث خطأ أثناء تحديث حالة الطلب",
            error: ("TURBOPACK compile-time truthy", 1) ? error.message : "TURBOPACK unreachable"
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0385d3c6._.js.map