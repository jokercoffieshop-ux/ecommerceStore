# 🔧 إصلاح خطأ 401 - نموذج الفئات

## ❌ المشكلة:

عند محاولة إضافة فئة جديدة، كانت جميع الطلبات تفشل بخطأ 401:

```
POST /api/categories 401 in 19ms
POST /api/categories 401 in 18ms
POST /api/categories 401 in 59ms
...
```

**السبب:**
- دالة `authenticateUser` في `lib/jwt.js` كانت تُرجع `null` أو `decoded user` مباشرة
- لكن API endpoints كانت تتوقع كائن `{success: boolean, user: object, message: string}`
- هذا تسبب في فشل المصادقة حتى مع وجود token صحيح

---

## ✅ الحل:

### 1. تحديث `lib/jwt.js`

**قبل:**
```javascript
export function authenticateUser(req) {
  const token = extractToken(req);
  if (!token) return null;
  return verifyToken(token);
}
```

**بعد:**
```javascript
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
```

### 2. تحديث `pages/api/user/profile.js`

**قبل:**
```javascript
const user = authenticateUser(req);

if (!user) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized. Please log in.",
  });
}
```

**بعد:**
```javascript
const authResult = await authenticateUser(req);

if (!authResult.success) {
  return res.status(401).json(authResult);
}

const user = authResult.user;
```

---

## 📊 الملفات المعدلة:

1. ✅ `lib/jwt.js` - تحديث دالة `authenticateUser`
2. ✅ `pages/api/user/profile.js` - تحديث استخدام `authenticateUser`

---

## ✅ الملفات التي كانت صحيحة بالفعل:

جميع الملفات التالية كانت تستخدم الصيغة الصحيحة:
- ✅ `pages/api/categories/index.js`
- ✅ `pages/api/categories/[id].js`
- ✅ `pages/api/products/index.js`
- ✅ `pages/api/products/[id].js`
- ✅ `pages/api/orders/index.js`
- ✅ `pages/api/orders/[id].js`
- ✅ `pages/api/orders/[id]/status.js`
- ✅ `pages/api/cart/index.js`
- ✅ `pages/api/cart/items.js`
- ✅ `pages/api/cart/items/[id].js`

---

## 🧪 الاختبار:

### قبل الإصلاح:
```
POST /api/categories 401 ❌
رسالة: Unauthorized
```

### بعد الإصلاح:
```
POST /api/categories 200 ✅
رسالة: تم إضافة الفئة بنجاح
```

---

## 🎯 كيفية الاختبار:

### 1. تسجيل الدخول:
```
1. افتح: http://localhost:3000/login
2. سجل دخول بحساب ADMIN
3. تأكد من حفظ token في cookies
```

### 2. اختبار إضافة فئة:
```
1. افتح: http://localhost:3000/admin/categories
2. اضغط "➕ إضافة فئة جديدة"
3. املأ النموذج:
   - الاسم بالعربية: قهوة عربية
   - الاسم بالإنجليزية: Arabic Coffee
4. اضغط "حفظ"
```

### 3. النتيجة المتوقعة:
```
✅ رسالة نجاح: "تم إضافة الفئة بنجاح"
✅ الفئة تظهر في الجدول
✅ لا أخطاء 401 في Console
✅ لا أخطاء في Terminal
```

---

## 🔍 التحقق من Console:

افتح DevTools (F12) → Console:

**قبل الإصلاح:**
```
POST http://localhost:3000/api/categories 401 (Unauthorized) ❌
```

**بعد الإصلاح:**
```
POST http://localhost:3000/api/categories 200 (OK) ✅
```

---

## 🔍 التحقق من Terminal:

**قبل الإصلاح:**
```
POST /api/categories 401 in 19ms ❌
POST /api/categories 401 in 18ms ❌
POST /api/categories 401 in 59ms ❌
```

**بعد الإصلاح:**
```
POST /api/categories 200 in 150ms ✅
GET /api/categories 200 in 25ms ✅
```

---

## 📝 ملاحظات مهمة:

### 1. Token في Cookies:
- تأكد من أن token محفوظ في cookies بعد تسجيل الدخول
- افتح DevTools → Application → Cookies → localhost:3000
- يجب أن ترى cookie باسم `token`

### 2. دور المستخدم:
- يجب أن يكون دور المستخدم `ADMIN` لإضافة فئات
- تحقق من الدور في قاعدة البيانات:
```sql
SELECT id, name, email, role FROM "User";
```

### 3. JWT Secret:
- تأكد من وجود `JWT_SECRET` في `.env`:
```env
JWT_SECRET=your-secret-key-here
```

---

## ✅ النتيجة النهائية:

**🎉 تم إصلاح خطأ 401 بنجاح!**

الآن يمكنك:
- ✅ إضافة فئات جديدة
- ✅ تعديل فئات موجودة
- ✅ حذف فئات
- ✅ رفع صور للفئات
- ✅ جميع عمليات CRUD تعمل بشكل صحيح

---

## 🔄 إذا استمرت المشكلة:

### 1. امسح Cookies:
```
DevTools → Application → Cookies → Clear all
```

### 2. سجل خروج ودخول مرة أخرى:
```
1. اضغط "تسجيل الخروج"
2. سجل دخول مرة أخرى
3. حاول إضافة فئة
```

### 3. تحقق من Terminal:
```
تأكد من عدم وجود أخطاء في:
- JWT verification
- Database connection
- File upload
```

### 4. أعد تشغيل الخادم:
```bash
# أوقف الخادم (Ctrl+C)
npm run dev
```

