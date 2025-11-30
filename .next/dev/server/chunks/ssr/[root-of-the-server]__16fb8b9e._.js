module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react/jsx-runtime [external] (react/jsx-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-runtime", () => require("react/jsx-runtime"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/coffe-project/hooks/useAuth.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * useAuth Hook
 * Custom React hook for managing authentication state
 */ __turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/next/router.js [ssr] (ecmascript)");
;
;
;
// Create Auth Context
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])({});
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Fetch user profile on mount
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        fetchUser();
    }, []);
    /**
   * Fetch current user profile
   */ const fetchUser = async ()=>{
        try {
            const res = await fetch("/api/user/profile");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            setUser(null);
        } finally{
            setLoading(false);
        }
    };
    /**
   * Login function
   */ const login = async (email, password)=>{
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                return {
                    success: true,
                    user: data.user
                };
            } else {
                return {
                    success: false,
                    message: data.message,
                    requiresVerification: data.requiresVerification
                };
            }
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: "Network error. Please try again."
            };
        }
    };
    /**
   * Register function
   */ const register = async (formData)=>{
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                return {
                    success: true,
                    user: data.user,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message,
                    errors: data.errors
                };
            }
        } catch (error) {
            console.error("Register error:", error);
            return {
                success: false,
                message: "Network error. Please try again."
            };
        }
    };
    /**
   * Logout function
   */ const logout = async ()=>{
        try {
            await fetch("/api/auth/logout", {
                method: "POST"
            });
            setUser(null);
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    /**
   * Send OTP function
   */ const sendOtp = async (email, type = "registration")=>{
        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    type
                })
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Send OTP error:", error);
            return {
                success: false,
                message: "Network error. Please try again."
            };
        }
    };
    /**
   * Verify OTP function
   */ const verifyOtp = async (email, code)=>{
        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    code
                })
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Verify OTP error:", error);
            return {
                success: false,
                message: "Network error. Please try again."
            };
        }
    };
    /**
   * Update profile function
   */ const updateProfile = async (formData)=>{
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                body: formData
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                return {
                    success: true,
                    user: data.user,
                    message: data.message
                };
            } else {
                return {
                    success: false,
                    message: data.message,
                    errors: data.errors
                };
            }
        } catch (error) {
            console.error("Update profile error:", error);
            return {
                success: false,
                message: "Network error. Please try again."
            };
        }
    };
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        sendOtp,
        verifyOtp,
        updateProfile,
        refreshUser: fetchUser
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/coffe-project/hooks/useAuth.js",
        lineNumber: 181,
        columnNumber: 10
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
}),
"[project]/Downloads/coffe-project/pages/_app.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Next.js App Component
 * Wraps all pages with AuthProvider for global auth state
 */ __turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/hooks/useAuth.js [ssr] (ecmascript)");
;
;
;
function App({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["AuthProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
            ...pageProps
        }, void 0, false, {
            fileName: "[project]/Downloads/coffe-project/pages/_app.js",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/coffe-project/pages/_app.js",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16fb8b9e._.js.map