module.exports = [
"[project]/Downloads/coffe-project/styles/Layout.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "closeIcon": "Layout-module__Fo1g7a__closeIcon",
  "fadeIn": "Layout-module__Fo1g7a__fadeIn",
  "footer": "Layout-module__Fo1g7a__footer",
  "footerBottom": "Layout-module__Fo1g7a__footerBottom",
  "footerContainer": "Layout-module__Fo1g7a__footerContainer",
  "footerSection": "Layout-module__Fo1g7a__footerSection",
  "hamburgerIcon": "Layout-module__Fo1g7a__hamburgerIcon",
  "layout": "Layout-module__Fo1g7a__layout",
  "logo": "Layout-module__Fo1g7a__logo",
  "logoutBtn": "Layout-module__Fo1g7a__logoutBtn",
  "main": "Layout-module__Fo1g7a__main",
  "mobileMenuToggle": "Layout-module__Fo1g7a__mobileMenuToggle",
  "mobileOverlay": "Layout-module__Fo1g7a__mobileOverlay",
  "navContainer": "Layout-module__Fo1g7a__navContainer",
  "navLinks": "Layout-module__Fo1g7a__navLinks",
  "navLinksOpen": "Layout-module__Fo1g7a__navLinksOpen",
  "navbar": "Layout-module__Fo1g7a__navbar",
  "userMenu": "Layout-module__Fo1g7a__userMenu",
  "userName": "Layout-module__Fo1g7a__userName",
});
}),
"[project]/Downloads/coffe-project/components/Layout.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Layout
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/hooks/useAuth.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/styles/Layout.module.css [ssr] (css module)");
;
;
;
;
;
;
function Layout({ children }) {
    const { user, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Prevent body scroll when mobile menu is open
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (mobileMenuOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
        return ()=>{
            document.body.classList.remove('menu-open');
        };
    }, [
        mobileMenuOpen
    ]);
    const handleLogout = async ()=>{
        await logout();
        router.push("/login");
        setMobileMenuOpen(false);
    };
    const toggleMobileMenu = ()=>{
        setMobileMenuOpen(!mobileMenuOpen);
    };
    const closeMobileMenu = ()=>{
        setMobileMenuOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].layout,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navbar,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logo,
                            onClick: closeMobileMenu,
                            children: "☕ بن تركي"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mobileMenuToggle,
                            onClick: toggleMobileMenu,
                            "aria-label": "Toggle menu",
                            children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].closeIcon,
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].hamburgerIcon,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 58,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navLinks} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].navLinksOpen : ''}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    onClick: closeMobileMenu,
                                    children: "الرئيسية"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/about",
                                    onClick: closeMobileMenu,
                                    children: "من نحن"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        user.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/admin/categories",
                                                    onClick: closeMobileMenu,
                                                    children: "📂 الفئات"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 75,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/admin/products",
                                                    onClick: closeMobileMenu,
                                                    children: "📦 المنتجات"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 78,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/admin/orders",
                                                    onClick: closeMobileMenu,
                                                    children: "📋 الطلبات"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 81,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/admin/users",
                                                    onClick: closeMobileMenu,
                                                    children: "المستخدمين"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 84,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        user.role === "STAFF" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/staff/products",
                                                    onClick: closeMobileMenu,
                                                    children: "📦 المنتجات"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 93,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/staff/orders",
                                                    onClick: closeMobileMenu,
                                                    children: "📋 الطلبات"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 96,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        user.role === "CLIENT" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/products",
                                                    onClick: closeMobileMenu,
                                                    children: "🛍️ المنتجات"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 105,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/cart",
                                                    onClick: closeMobileMenu,
                                                    children: "🛒 السلة"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 108,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/orders",
                                                    onClick: closeMobileMenu,
                                                    children: "📦 طلباتي"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 111,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].userMenu,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].userName,
                                                    children: [
                                                        "👤 ",
                                                        user.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 119,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/profile",
                                                    onClick: closeMobileMenu,
                                                    children: "⚙️ الملف الشخصي"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 120,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: handleLogout,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].logoutBtn,
                                                    children: "🚪 تسجيل الخروج"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 123,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                            lineNumber: 118,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/products",
                                            onClick: closeMobileMenu,
                                            children: "🛍️ المنتجات"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            onClick: closeMobileMenu,
                                            children: "🔑 تسجيل الدخول"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/register",
                                            onClick: closeMobileMenu,
                                            children: "✨ إنشاء حساب"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].mobileOverlay,
                onClick: closeMobileMenu
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                lineNumber: 147,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].main,
                children: children
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("footer", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footerContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footerSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: "☕ بن تركي"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 158,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        children: "أصالة القهوة العربية في كل فنجان"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footerSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        children: "روابط سريعة"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/products",
                                                    children: "المنتجات"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                lineNumber: 165,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/about",
                                                    children: "من نحن"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                    lineNumber: 166,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                lineNumber: 166,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footerSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        children: "تواصل معنا"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: "jokercoffieshop@gmail.com"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                lineNumber: 175,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: "📱 +20 1028975556"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                lineNumber: 176,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                                                children: "📍 الخانكه ، جمهورية مصر العربية"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                                lineNumber: 177,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Layout$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].footerBottom,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                            children: "© 2025 بن تركي — جميع الحقوق محفوظة."
                        }, void 0, false, {
                            fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                            lineNumber: 183,
                            columnNumber: 10
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/coffe-project/components/Layout.js",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/coffe-project/components/Layout.js",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/coffe-project/styles/Auth.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "authCard": "Auth-module__Scr76q__authCard",
  "authContainer": "Auth-module__Scr76q__authContainer",
  "authFooter": "Auth-module__Scr76q__authFooter",
  "authForm": "Auth-module__Scr76q__authForm",
  "authSubtitle": "Auth-module__Scr76q__authSubtitle",
  "authTitle": "Auth-module__Scr76q__authTitle",
  "error": "Auth-module__Scr76q__error",
  "filePreview": "Auth-module__Scr76q__filePreview",
  "fileUpload": "Auth-module__Scr76q__fileUpload",
  "forgotPassword": "Auth-module__Scr76q__forgotPassword",
  "formGroup": "Auth-module__Scr76q__formGroup",
  "submitBtn": "Auth-module__Scr76q__submitBtn",
});
}),
"[project]/Downloads/coffe-project/pages/login.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Login Page
 * User authentication with email and password
 */ __turbopack_context__.s([
    "default",
    ()=>Login
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/hooks/useAuth.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Layout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/components/Layout.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/styles/Auth.module.css [ssr] (css module)");
;
;
;
;
;
;
;
function Login() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$hooks$2f$useAuth$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        email: "",
        password: ""
    });
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setMessage("");
        const result = await login(formData.email, formData.password);
        if (result.success) {
            // Redirect based on user role
            const role = result.user.role;
            if (role === "ADMIN") {
                router.push("/admin/categories");
            } else if (role === "STAFF") {
                router.push("/staff/orders");
            } else {
                router.push("/products");
            }
        } else {
            if (result.requiresVerification) {
                setMessage("يرجى التحقق من بريدك الإلكتروني قبل تسجيل الدخول");
                // Redirect to OTP verification page
                setTimeout(()=>{
                    router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
                }, 2000);
            } else {
                setMessage(result.message);
            }
        }
        setLoading(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$components$2f$Layout$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authCard,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authTitle,
                        children: "تسجيل الدخول"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authSubtitle,
                        children: "مرحباً بعودتك إلى متجر القهوة"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "alert alert-error",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authForm,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        children: "البريد الإلكتروني"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        name: "email",
                                        value: formData.email,
                                        onChange: handleChange,
                                        required: true,
                                        placeholder: "example@email.com"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this),
                                    errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                                        children: errors.email
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                        lineNumber: 93,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                        children: "كلمة المرور"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                        type: "password",
                                        name: "password",
                                        value: formData.password,
                                        onChange: handleChange,
                                        required: true,
                                        placeholder: "أدخل كلمة المرور"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].error,
                                        children: errors.password
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                        lineNumber: 106,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].forgotPassword,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/forgot-password",
                                    children: "نسيت كلمة المرور؟"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].submitBtn,
                                disabled: loading,
                                children: loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$styles$2f$Auth$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].authFooter,
                        children: [
                            "ليس لديك حساب؟",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/register",
                                children: "إنشاء حساب جديد"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/login.js",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/coffe-project/pages/login.js",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/coffe-project/pages/login.js",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Downloads/coffe-project/pages/login.js",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/coffe-project/pages/login.js",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d3701ddb._.js.map