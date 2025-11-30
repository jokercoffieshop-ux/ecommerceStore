(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/Downloads/coffe-project/pages/contact.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContactUs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/coffe-project/node_modules/react/index.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
function ContactUs() {
    _s();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        email: '',
        phone: '',
        type: 'استفسار',
        subject: '',
        message: ''
    });
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        type: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        setIsSubmitting(true);
        // محاكاة إرسال النموذج
        setTimeout(()=>{
            setStatus({
                type: 'success',
                message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً 🎉'
            });
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                type: 'استفسار',
                subject: '',
                message: ''
            });
            setTimeout(()=>setStatus({
                    type: '',
                    message: ''
                }), 5000);
        }, 1500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            fontFamily: 'Cairo, sans-serif',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8f5f0 0%, #fff 100%)',
            padding: '2rem 1rem'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    background: 'linear-gradient(135deg, #654321 0%, #8B4513 40%, #A0522D 100%)',
                    color: 'white',
                    padding: '6rem 2rem',
                    textAlign: 'center',
                    borderRadius: '24px',
                    marginBottom: '4rem',
                    boxShadow: '0 20px 60px rgba(101, 67, 33, 0.4)',
                    position: 'relative',
                    overflow: 'hidden',
                    maxWidth: '1400px',
                    margin: '0 auto 4rem'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                            animation: 'float 8s ease-in-out infinite'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'relative',
                            zIndex: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '2rem',
                                    fontSize: '5rem'
                                },
                                children: "📞"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: '3.5rem',
                                    marginBottom: '1rem',
                                    fontWeight: 900,
                                    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)'
                                },
                                children: "اتصل بنا"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: '1.5rem',
                                    opacity: 0.95,
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                                },
                                children: "نحن هنا للإجابة على جميع استفساراتك وشكاويك"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                },
                children: [
                    {
                        icon: '📱',
                        title: 'الهاتف',
                        content: [
                            '+20 123 456 7890',
                            '+20 100 111 2222'
                        ]
                    },
                    {
                        icon: '📧',
                        title: 'البريد الإلكتروني',
                        content: [
                            'info@binturki.com',
                            'support@binturki.com'
                        ]
                    },
                    {
                        icon: '📍',
                        title: 'العنوان',
                        content: [
                            'القاهرة، مصر',
                            'شارع النيل، الدقي'
                        ]
                    }
                ].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ContactCard, {
                        ...item
                    }, idx, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '900px',
                    margin: '0 auto',
                    background: 'white',
                    padding: '3rem',
                    borderRadius: '24px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: '2.5rem',
                            color: '#654321',
                            marginBottom: '2rem',
                            textAlign: 'center',
                            fontWeight: 900
                        },
                        children: "أرسل لنا رسالة"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    status.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '1.2rem',
                            borderRadius: '12px',
                            marginBottom: '2rem',
                            background: status.type === 'success' ? 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)' : 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
                            color: status.type === 'success' ? '#155724' : '#721c24',
                            border: `2px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textAlign: 'center'
                        },
                        children: status.message
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 135,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
                                        label: "الاسم *",
                                        type: "text",
                                        name: "name",
                                        value: formData.name,
                                        onChange: handleChange,
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
                                        label: "البريد الإلكتروني *",
                                        type: "email",
                                        name: "email",
                                        value: formData.email,
                                        onChange: handleChange,
                                        required: true,
                                        ltr: true
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                        lineNumber: 168,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '1.5rem',
                                    marginBottom: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
                                        label: "رقم الهاتف",
                                        type: "tel",
                                        name: "phone",
                                        value: formData.phone,
                                        onChange: handleChange,
                                        ltr: true
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectField, {
                                        label: "نوع الرسالة *",
                                        name: "type",
                                        value: formData.type,
                                        onChange: handleChange,
                                        options: [
                                            {
                                                value: 'استفسار',
                                                label: 'استفسار عام'
                                            },
                                            {
                                                value: 'شكوى',
                                                label: 'شكوى'
                                            },
                                            {
                                                value: 'اقتراح',
                                                label: 'اقتراح'
                                            },
                                            {
                                                value: 'طلب',
                                                label: 'استفسار عن طلب'
                                            },
                                            {
                                                value: 'منتج',
                                                label: 'استفسار عن منتج'
                                            }
                                        ]
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '1.5rem'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InputField, {
                                    label: "الموضوع *",
                                    type: "text",
                                    name: "subject",
                                    value: formData.subject,
                                    onChange: handleChange,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginBottom: '2rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            marginBottom: '0.5rem',
                                            color: '#654321',
                                            fontWeight: 700,
                                            fontSize: '1.1rem'
                                        },
                                        children: "الرسالة *"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        name: "message",
                                        value: formData.message,
                                        onChange: handleChange,
                                        required: true,
                                        rows: "6",
                                        style: {
                                            width: '100%',
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: '2px solid #e0e0e0',
                                            fontSize: '1rem',
                                            fontFamily: 'Cairo, sans-serif',
                                            transition: 'all 0.3s ease',
                                            boxSizing: 'border-box',
                                            resize: 'vertical'
                                        },
                                        onFocus: (e)=>{
                                            e.target.style.borderColor = '#8B4513';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(139, 69, 19, 0.1)';
                                        },
                                        onBlur: (e)=>{
                                            e.target.style.borderColor = '#e0e0e0';
                                            e.target.style.boxShadow = 'none';
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                        lineNumber: 230,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSubmit,
                                disabled: isSubmitting,
                                style: {
                                    width: '100%',
                                    padding: '1.3rem',
                                    background: isSubmitting ? 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)' : 'linear-gradient(135deg, #654321 0%, #8B4513 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.3rem',
                                    fontWeight: 800,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.4s ease',
                                    fontFamily: 'Cairo, sans-serif',
                                    boxShadow: '0 8px 20px rgba(101, 67, 33, 0.3)'
                                },
                                onMouseEnter: (e)=>{
                                    if (!isSubmitting) {
                                        e.target.style.transform = 'translateY(-3px)';
                                        e.target.style.boxShadow = '0 12px 30px rgba(101, 67, 33, 0.4)';
                                    }
                                },
                                onMouseLeave: (e)=>{
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 8px 20px rgba(101, 67, 33, 0.3)';
                                },
                                children: isSubmitting ? '⏳ جاري الإرسال...' : '📤 إرسال الرسالة'
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '900px',
                    margin: '4rem auto 0',
                    background: 'linear-gradient(135deg, #654321 0%, #8B4513 100%)',
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    boxShadow: '0 15px 45px rgba(101, 67, 33, 0.3)',
                    textAlign: 'center',
                    color: 'white'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '3.5rem',
                            marginBottom: '1.5rem'
                        },
                        children: "⏰"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: '2.5rem',
                            marginBottom: '2rem',
                            fontWeight: 900,
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                        },
                        children: "أوقات العمل"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: '1.3rem',
                            lineHeight: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "السبت - الخميس: 9:00 صباحاً - 10:00 مساءً"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "الجمعة: 2:00 مساءً - 10:00 مساءً"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                                lineNumber: 315,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 294,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
        
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: translate(30px, -30px) scale(1.1); 
            opacity: 1;
          }
        }
      `
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 319,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(ContactUs, "RZkoXYcf7y0KswRxBExIGRAUGk8=");
_c = ContactUs;
function ContactCard({ icon, title, content }) {
    _s1();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            background: 'linear-gradient(135deg, #fff 0%, #f8f5f0 100%)',
            padding: '3rem 2rem',
            borderRadius: '20px',
            boxShadow: isHovered ? '0 15px 45px rgba(111, 78, 55, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.4s ease',
            border: `2px solid ${isHovered ? 'rgba(111, 78, 55, 0.2)' : 'transparent'}`,
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)'
        },
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>setIsHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '3.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center'
                },
                children: icon
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 354,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    fontSize: '1.8rem',
                    color: '#654321',
                    marginBottom: '1rem',
                    fontWeight: 800,
                    textAlign: 'center'
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            content.map((text, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontSize: '1.2rem',
                        color: '#666',
                        textAlign: 'center',
                        direction: title === 'الهاتف' || title === 'البريد الإلكتروني' ? 'ltr' : 'rtl',
                        marginTop: idx > 0 ? '0.5rem' : 0
                    },
                    children: text
                }, idx, false, {
                    fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                    lineNumber: 365,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
        lineNumber: 341,
        columnNumber: 5
    }, this);
}
_s1(ContactCard, "FPQn8a98tPjpohC7NUYORQR8GJE=");
_c1 = ContactCard;
function InputField({ label, type, name, value, onChange, required, ltr }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#654321',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: type,
                name: name,
                value: value,
                onChange: onChange,
                required: required,
                style: {
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem',
                    fontFamily: 'Cairo, sans-serif',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    direction: ltr ? 'ltr' : 'rtl',
                    textAlign: ltr ? 'right' : 'right'
                },
                onFocus: (e)=>{
                    e.target.style.borderColor = '#8B4513';
                    e.target.style.boxShadow = '0 0 0 4px rgba(139, 69, 19, 0.1)';
                },
                onBlur: (e)=>{
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                }
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 391,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
        lineNumber: 381,
        columnNumber: 5
    }, this);
}
_c2 = InputField;
function SelectField({ label, name, value, onChange, options }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    display: 'block',
                    marginBottom: '0.5rem',
                    color: '#654321',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 425,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                name: name,
                value: value,
                onChange: onChange,
                required: true,
                style: {
                    width: '100%',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem',
                    fontFamily: 'Cairo, sans-serif',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    background: 'white'
                },
                onFocus: (e)=>{
                    e.target.style.borderColor = '#8B4513';
                    e.target.style.boxShadow = '0 0 0 4px rgba(139, 69, 19, 0.1)';
                },
                onBlur: (e)=>{
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = 'none';
                },
                children: options.map((opt, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$coffe$2d$project$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: opt.value,
                        children: opt.label
                    }, idx, false, {
                        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                        lineNumber: 461,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/coffe-project/pages/contact.js",
                lineNumber: 434,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/coffe-project/pages/contact.js",
        lineNumber: 424,
        columnNumber: 5
    }, this);
}
_c3 = SelectField;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ContactUs");
__turbopack_context__.k.register(_c1, "ContactCard");
__turbopack_context__.k.register(_c2, "InputField");
__turbopack_context__.k.register(_c3, "SelectField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/Downloads/coffe-project/pages/contact.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/contact";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/Downloads/coffe-project/pages/contact.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/Downloads/coffe-project/pages/contact\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/Downloads/coffe-project/pages/contact.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__7d1a464a._.js.map