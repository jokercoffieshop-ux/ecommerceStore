module.exports = [
"[project]/Downloads/coffe-project/components/Card.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Card Component
 * Reusable card container
 */ __turbopack_context__.s([
    "default",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Card({ title, children, style }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "2rem",
            maxWidth: "500px",
            margin: "0 auto",
            ...style
        },
        children: [
            title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                style: {
                    marginTop: 0,
                    marginBottom: "1.5rem",
                    color: "#6F4E37",
                    textAlign: "center"
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/components/Card.js",
                lineNumber: 18,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/coffe-project/components/Card.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/coffe-project/components/Input.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Input Component
 * Reusable form input with label and error display
 */ __turbopack_context__.s([
    "default",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Input({ label, error, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: "1rem"
        },
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                style: {
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333"
                },
                children: [
                    label,
                    props.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        style: {
                            color: "red"
                        },
                        children: " *"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/components/Input.js",
                        lineNumber: 17,
                        columnNumber: 30
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/coffe-project/components/Input.js",
                lineNumber: 10,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                ...props,
                style: {
                    width: "100%",
                    padding: "0.75rem",
                    border: error ? "2px solid #dc3545" : "1px solid #ddd",
                    borderRadius: "4px",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                    ...props.style
                }
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/components/Input.js",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                style: {
                    display: "block",
                    marginTop: "0.25rem",
                    color: "#dc3545",
                    fontSize: "0.875rem"
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/components/Input.js",
                lineNumber: 33,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/coffe-project/components/Input.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/coffe-project/components/Button.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Button Component
 * Reusable button with loading state
 */ __turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
;
function Button({ children, loading, variant = "primary", ...props }) {
    const variants = {
        primary: {
            backgroundColor: "#6F4E37",
            color: "white",
            border: "none"
        },
        secondary: {
            backgroundColor: "#8B4513",
            color: "white",
            border: "none"
        },
        outline: {
            backgroundColor: "transparent",
            color: "#6F4E37",
            border: "2px solid #6F4E37"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
        ...props,
        disabled: loading || props.disabled,
        style: {
            ...variants[variant],
            padding: "0.75rem 1.5rem",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: loading || props.disabled ? "not-allowed" : "pointer",
            opacity: loading || props.disabled ? 0.6 : 1,
            transition: "all 0.2s",
            ...props.style
        },
        children: loading ? "Loading..." : children
    }, void 0, false, {
        fileName: "[project]/Downloads/coffe-project/components/Button.js",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/coffe-project/pages/verify-otp.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * OTP Verification Page
 * Verify email with OTP code sent to user's email
 */ __turbopack_context__.s([
    "default",
    ()=>VerifyOtp
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/hooks/useAuth.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Card$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/components/Card.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Input$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/components/Input.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/components/Button.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
function VerifyOtp() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { verifyOtp, sendOtp } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { email } = router.query;
    const [code, setCode] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [resending, setResending] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!email) {
            router.push("/register");
        }
    }, [
        email,
        router
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        const result = await verifyOtp(email, code);
        if (result.success) {
            setMessage(result.message);
            // Redirect to login page after 2 seconds
            setTimeout(()=>{
                router.push("/login");
            }, 2000);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };
    const handleResend = async ()=>{
        setResending(true);
        setError("");
        setMessage("");
        const result = await sendOtp(email, "registration");
        if (result.success) {
            setMessage("New OTP sent to your email!");
        } else {
            setError(result.message);
        }
        setResending(false);
    };
    if (!email) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: {
            padding: "2rem 0"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Card$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
            title: "Verify Your Email",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        textAlign: "center",
                        color: "#666",
                        marginBottom: "1.5rem"
                    },
                    children: [
                        "We've sent a 6-digit code to ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                            children: email
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                            lineNumber: 75,
                            columnNumber: 40
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-success",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                    lineNumber: 79,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "alert alert-error",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                    lineNumber: 85,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Input$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            label: "Verification Code",
                            type: "text",
                            value: code,
                            onChange: (e)=>setCode(e.target.value),
                            required: true,
                            placeholder: "Enter 6-digit code",
                            maxLength: 6,
                            style: {
                                textAlign: "center",
                                fontSize: "1.5rem",
                                letterSpacing: "0.5rem"
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "submit",
                            loading: loading,
                            style: {
                                width: "100%"
                            },
                            children: "Verify Email"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                    lineNumber: 90,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        marginTop: "1.5rem",
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            style: {
                                color: "#666",
                                marginBottom: "0.5rem"
                            },
                            children: "Didn't receive the code?"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Button$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            variant: "outline",
                            onClick: handleResend,
                            loading: resending,
                            type: "button",
                            children: "Resend Code"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
            lineNumber: 73,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/coffe-project/pages/verify-otp.js",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc74a1a3._.js.map