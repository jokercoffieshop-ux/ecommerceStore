# 🚀 دليل البدء السريع - نظام القهوة العربي

## ⚡ الخطوات السريعة

### 1. تشغيل هجرة قاعدة البيانات

```bash
# أوقف الخادم الحالي (Ctrl + C)

# شغّل الهجرة لإضافة الجداول الجديدة
npx prisma migrate dev --name add_ecommerce_tables

# توليد Prisma Client
npx prisma generate

# إعادة تشغيل الخادم
npm run dev
```

### 2. فتح Prisma Studio (اختياري)

```bash
# في terminal جديد
npx prisma studio
```

سيفتح على: http://localhost:5555

### 3. اختبار النظام

#### أ. إنشاء حساب Admin

1. افتح: http://localhost:3000/register
2. سجل حساب جديد
3. افتح قاعدة البيانات وغيّر `role` إلى `ADMIN`:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

أو باستخدام Prisma Studio:
- افتح جدول User
- اختر المستخدم
- غيّر role إلى ADMIN
- احفظ

#### ب. إضافة فئة

```bash
# باستخدام cURL (بعد تسجيل الدخول كـ Admin)
curl -X POST http://localhost:3000/api/categories \
  -F "nameAr=قهوة ساخنة" \
  -F "nameEn=Hot Coffee" \
  -F "descriptionAr=قهوة طازجة ساخنة" \
  -F "isActive=true" \
  -F "order=1"
```

أو باستخدام Postman:
- Method: POST
- URL: http://localhost:3000/api/categories
- Body: form-data
  - nameAr: قهوة ساخنة
  - nameEn: Hot Coffee
  - descriptionAr: قهوة طازجة ساخنة
  - isActive: true
  - order: 1

#### ج. إضافة منتج

```bash
curl -X POST http://localhost:3000/api/products \
  -F "nameAr=كابتشينو" \
  -F "nameEn=Cappuccino" \
  -F "descriptionAr=كابتشينو إيطالي أصلي" \
  -F "price=25.50" \
  -F "categoryId=1" \
  -F "stock=100" \
  -F "isAvailable=true" \
  -F "size=متوسط"
```

#### د. عرض المنتجات

```bash
# عرض كل المنتجات
curl http://localhost:3000/api/products

# بحث
curl "http://localhost:3000/api/products?search=كابتشينو"

# فلترة حسب الفئة
curl "http://localhost:3000/api/products?categoryId=1"
```

#### هـ. إضافة منتج للسلة

```bash
curl -X POST http://localhost:3000/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 2}'
```

#### و. عرض السلة

```bash
curl http://localhost:3000/api/cart
```

#### ز. إنشاء طلب

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "يوسف أحمد",
    "customerPhone": "0123456789",
    "address": "شارع الملك فهد، الرياض",
    "city": "الرياض",
    "paymentMethod": "CASH"
  }'
```

---

## 📁 هيكل المشروع

```
coffe-project/
├── pages/
│   ├── api/
│   │   ├── categories/          # APIs الفئات
│   │   │   ├── index.js         # GET, POST
│   │   │   └── [id].js          # GET, PUT, DELETE
│   │   ├── products/            # APIs المنتجات
│   │   │   ├── index.js         # GET, POST
│   │   │   ├── [id].js          # GET, PUT, DELETE
│   │   │   └── [id]/stock.js    # PATCH
│   │   ├── cart/                # APIs السلة
│   │   │   ├── index.js         # GET, DELETE
│   │   │   ├── items.js         # POST
│   │   │   └── items/[id].js    # PUT, DELETE
│   │   └── orders/              # APIs الطلبات
│   │       ├── index.js         # GET, POST
│   │       ├── [id].js          # GET
│   │       └── [id]/status.js   # PATCH
│   ├── register.js              # صفحة التسجيل
│   ├── login.js                 # صفحة تسجيل الدخول
│   └── ...
├── prisma/
│   └── schema.prisma            # قاعدة البيانات
├── lib/
│   ├── prisma.js                # Prisma Client
│   ├── jwt.js                   # JWT & Auth
│   ├── validation.js            # Zod Validation
│   ├── upload.js                # File Upload
│   └── email.js                 # Email Service
├── styles/
│   └── globals.css              # الأنماط العربية
├── API_DOCUMENTATION_AR.md      # توثيق APIs
├── ARABIC_SYSTEM_PROGRESS.md    # تقرير التقدم
└── QUICK_START_AR.md            # هذا الملف
```

---

## 🎨 الأنماط الجاهزة

تم إضافة أنماط عربية جاهزة في `styles/globals.css`:

### الألوان:
```css
var(--coffee-dark)    /* #2c1810 - البني الداكن */
var(--coffee-brown)   /* #6F4E37 - البني المتوسط */
var(--coffee-light)   /* #A0826D - البني الفاتح */
var(--coffee-cream)   /* #D2B48C - الكريمي */
var(--coffee-bg)      /* #f8f5f0 - الخلفية */
```

### المكونات:
- `.card` - بطاقات مع hover effects
- `.alert` - تنبيهات ملونة
- `.badge` - شارات للحالات
- `table` - جداول منسقة
- `.loading` - أيقونة تحميل

### الأدوات المساعدة:
- `.text-center`, `.text-right`, `.text-left`
- `.mt-1` إلى `.mt-4` (margins)
- `.p-1` إلى `.p-4` (padding)
- `.flex`, `.flex-center`, `.flex-between`
- `.rounded`, `.rounded-lg`, `.rounded-full`
- `.shadow-sm`, `.shadow-md`, `.shadow-lg`

---

## 🔍 استكشاف الأخطاء

### خطأ: "Unknown argument 'name'"
```bash
npx prisma generate
# ثم أعد تشغيل الخادم
```

### خطأ: "Table does not exist"
```bash
npx prisma migrate dev --name add_ecommerce_tables
```

### خطأ: "Cannot read properties of undefined"
- تأكد من تشغيل `npx prisma generate`
- أعد تشغيل الخادم

---

## 📚 الملفات المهمة

- **API_DOCUMENTATION_AR.md** - توثيق شامل لكل APIs
- **ARABIC_SYSTEM_PROGRESS.md** - تقرير التقدم والمهام المتبقية
- **TROUBLESHOOTING.md** - دليل حل المشاكل
- **README_AUTH.md** - توثيق نظام المصادقة

---

## ✅ قائمة التحقق

- [ ] تشغيل الهجرة
- [ ] توليد Prisma Client
- [ ] إعادة تشغيل الخادم
- [ ] إنشاء حساب Admin
- [ ] إضافة فئة تجريبية
- [ ] إضافة منتج تجريبي
- [ ] اختبار السلة
- [ ] اختبار إنشاء طلب

---

**بعد إكمال هذه الخطوات، أخبرني بالنتيجة لأكمل بناء الواجهات!** 🚀

