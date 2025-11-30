# 📚 توثيق APIs - نظام القهوة العربي

## 🔐 المصادقة (Authentication)

جميع الطلبات المحمية تتطلب JWT token في الكوكيز أو في header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📋 الفئات (Categories)

### 1. عرض كل الفئات
```http
GET /api/categories
```

**Query Parameters:**
- `active` (optional): `true` لعرض الفئات النشطة فقط

**Response:**
```json
{
  "success": true,
  "categories": [
    {
      "id": 1,
      "nameAr": "قهوة ساخنة",
      "nameEn": "Hot Coffee",
      "descriptionAr": "قهوة طازجة ساخنة",
      "imageUrl": "/uploads/category.jpg",
      "isActive": true,
      "order": 1,
      "_count": { "products": 5 }
    }
  ]
}
```

### 2. إضافة فئة جديدة (Admin)
```http
POST /api/categories
Content-Type: multipart/form-data
```

**Body (FormData):**
- `nameAr` (required): الاسم بالعربية
- `nameEn` (optional): الاسم بالإنجليزية
- `descriptionAr` (optional): الوصف بالعربية
- `descriptionEn` (optional): الوصف بالإنجليزية
- `image` (optional): ملف الصورة
- `isActive` (optional): `true` أو `false`
- `order` (optional): رقم الترتيب

### 3. عرض فئة واحدة
```http
GET /api/categories/[id]
```

### 4. تعديل فئة (Admin)
```http
PUT /api/categories/[id]
Content-Type: multipart/form-data
```

### 5. حذف فئة (Admin)
```http
DELETE /api/categories/[id]
```

**ملاحظة:** لا يمكن حذف فئة تحتوي على منتجات

---

## 🛍️ المنتجات (Products)

### 1. عرض كل المنتجات
```http
GET /api/products
```

**Query Parameters:**
- `search` (optional): البحث في الاسم والوصف
- `categoryId` (optional): فلترة حسب الفئة
- `isAvailable` (optional): `true` أو `false`
- `minPrice` (optional): الحد الأدنى للسعر
- `maxPrice` (optional): الحد الأقصى للسعر
- `page` (optional): رقم الصفحة (default: 1)
- `limit` (optional): عدد العناصر (default: 12)
- `sortBy` (optional): الترتيب حسب (default: createdAt)
- `sortOrder` (optional): `asc` أو `desc` (default: desc)

**Response:**
```json
{
  "success": true,
  "products": [...],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 12,
    "totalPages": 5
  }
}
```

### 2. إضافة منتج جديد (Admin/Staff)
```http
POST /api/products
Content-Type: multipart/form-data
```

**Body (FormData):**
- `nameAr` (required): الاسم بالعربية
- `nameEn` (optional): الاسم بالإنجليزية
- `descriptionAr` (optional): الوصف بالعربية
- `price` (required): السعر
- `categoryId` (required): معرف الفئة
- `stock` (optional): الكمية في المخزون (default: 0)
- `isAvailable` (optional): `true` أو `false`
- `size` (optional): الحجم
- `weight` (optional): الوزن
- `sku` (optional): رمز المنتج (يجب أن يكون فريداً)
- `image` (optional): ملف الصورة

### 3. عرض منتج واحد
```http
GET /api/products/[id]
```

### 4. تعديل منتج (Admin/Staff)
```http
PUT /api/products/[id]
Content-Type: multipart/form-data
```

### 5. حذف منتج (Admin/Staff)
```http
DELETE /api/products/[id]
```

### 6. تحديث المخزون (Admin/Staff)
```http
PATCH /api/products/[id]/stock
Content-Type: application/json
```

**Body:**
```json
{
  "stock": 50,
  "operation": "set"  // "set", "add", or "subtract"
}
```

---

## 🛒 السلة (Cart)

### 1. عرض سلة المستخدم
```http
GET /api/cart
```

**Response:**
```json
{
  "success": true,
  "cart": {
    "id": 1,
    "userId": 1,
    "items": [...],
    "total": 150.50,
    "itemsCount": 3,
    "totalQuantity": 5
  }
}
```

### 2. إضافة منتج للسلة
```http
POST /api/cart/items
Content-Type: application/json
```

**Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

### 3. تعديل كمية منتج في السلة
```http
PUT /api/cart/items/[id]
Content-Type: application/json
```

**Body:**
```json
{
  "quantity": 3
}
```

### 4. حذف منتج من السلة
```http
DELETE /api/cart/items/[id]
```

### 5. تفريغ السلة
```http
DELETE /api/cart
```

---

## 📦 الطلبات (Orders)

### 1. عرض الطلبات
```http
GET /api/orders
```

**Query Parameters:**
- `status` (optional): فلترة حسب الحالة
- `page` (optional): رقم الصفحة
- `limit` (optional): عدد العناصر
- `sortBy` (optional): الترتيب حسب
- `sortOrder` (optional): `asc` أو `desc`

**ملاحظة:**
- Admin/Staff: يرون كل الطلبات
- Client: يرى طلباته فقط

### 2. إنشاء طلب جديد
```http
POST /api/orders
Content-Type: application/json
```

**Body:**
```json
{
  "customerName": "يوسف أحمد",
  "customerPhone": "0123456789",
  "customerEmail": "yousef@example.com",
  "address": "شارع الملك فهد، الرياض",
  "city": "الرياض",
  "notes": "ملاحظات إضافية",
  "paymentMethod": "CASH"  // CASH, CARD, or ONLINE
}
```

**ملاحظة:** يتم إنشاء الطلب من محتويات السلة الحالية

### 3. عرض تفاصيل طلب
```http
GET /api/orders/[id]
```

### 4. تحديث حالة الطلب (Admin/Staff)
```http
PATCH /api/orders/[id]/status
Content-Type: application/json
```

**Body:**
```json
{
  "status": "PROCESSING"
}
```

**الحالات المتاحة:**
- `PENDING`: قيد الانتظار
- `PROCESSING`: قيد المعالجة
- `SHIPPED`: تم الشحن
- `DELIVERED`: تم التوصيل
- `CANCELLED`: ملغي
- `REFUNDED`: مسترجع

**ملاحظة:** عند الإلغاء أو الاسترجاع، يتم إرجاع المنتجات للمخزون تلقائياً

---

## 🔑 الصلاحيات (Roles)

### ADMIN
- كل الصلاحيات
- إدارة الفئات
- إدارة المنتجات
- إدارة الطلبات
- إدارة المستخدمين

### STAFF
- إدارة المنتجات
- إدارة الطلبات
- عرض الفئات

### CLIENT
- عرض المنتجات والفئات
- إدارة السلة الخاصة
- إنشاء وعرض الطلبات الخاصة

---

## ⚠️ رموز الأخطاء

- `200`: نجح الطلب
- `201`: تم الإنشاء بنجاح
- `400`: خطأ في البيانات المرسلة
- `401`: غير مصادق عليه
- `403`: غير مصرح له
- `404`: غير موجود
- `405`: الطريقة غير مسموحة
- `500`: خطأ في الخادم

---

## 📝 أمثلة استخدام

### مثال: إضافة منتج للسلة
```javascript
const response = await fetch('/api/cart/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productId: 1,
    quantity: 2
  })
});

const data = await response.json();
console.log(data);
```

### مثال: إنشاء طلب
```javascript
const response = await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    customerName: 'يوسف أحمد',
    customerPhone: '0123456789',
    address: 'شارع الملك فهد، الرياض',
    city: 'الرياض',
    paymentMethod: 'CASH'
  })
});

const data = await response.json();
console.log(data);
```

