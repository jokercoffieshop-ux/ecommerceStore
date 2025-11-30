# 📱 التحقق من رقم الهاتف المصري

## ✅ **تم التحديث بنجاح!**

### 🎯 **ما تم إنجازه:**

---

## 1️⃣ **إضافة التحقق من رقم الهاتف المصري**

### **صيغة رقم الهاتف المصري المقبولة:**

```
✅ +201012345678  (مع كود الدولة +20)
✅ 01012345678    (بدون كود الدولة)
✅ +201112345678  (شبكة فودافون)
✅ +201212345678  (شبكة أورانج)
✅ +201512345678  (شبكة WE)

❌ +966501234567  (سعودي - مرفوض)
❌ 0501234567     (غير مصري - مرفوض)
❌ 123456789      (قصير جداً - مرفوض)
```

### **Regex المستخدم:**
```javascript
/^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/
```

**الشرح:**
- `(\+20|0)?` - اختياري: يبدأ بـ +20 أو 0
- `1` - يجب أن يبدأ الرقم بـ 1
- `[0-2,5]{1}` - الرقم الثاني: 0 أو 1 أو 2 أو 5 (شبكات مصر)
- `[0-9]{8}` - 8 أرقام متبقية

---

## 2️⃣ **الملفات المحدثة:**

### **1. `lib/validation.js`** ✅

#### **إضافة Regex للهاتف المصري:**
```javascript
const egyptianPhoneRegex = /^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/;
```

#### **تحديث `registerSchema`:**
```javascript
phone: z
  .string()
  .regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)")
  .optional()
  .or(z.literal("")),
```

#### **تحديث `updateProfileSchema`:**
```javascript
phone: z
  .string()
  .regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)")
  .optional()
  .or(z.literal("")),
```

#### **إضافة `createOrderSchema` (جديد):**
```javascript
export const createOrderSchema = z.object({
  customerName: z
    .string()
    .min(2, "الاسم يجب أن يكون حرفين على الأقل")
    .max(100, "الاسم يجب أن يكون أقل من 100 حرف"),
  customerPhone: z
    .string()
    .regex(egyptianPhoneRegex, "رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)"),
  customerEmail: z
    .string()
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, "العنوان يجب أن يكون 5 أحرف على الأقل")
    .max(500, "العنوان يجب أن يكون أقل من 500 حرف"),
  city: z
    .string()
    .min(2, "المدينة يجب أن تكون حرفين على الأقل")
    .max(100, "المدينة يجب أن تكون أقل من 100 حرف")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .max(1000, "الملاحظات يجب أن تكون أقل من 1000 حرف")
    .optional()
    .or(z.literal("")),
  paymentMethod: z.enum(["CASH", "CARD", "WALLET"], {
    errorMap: () => ({ message: "طريقة الدفع غير صحيحة" }),
  }).optional(),
});
```

---

### **2. `pages/api/orders/index.js`** ✅

#### **إضافة Import:**
```javascript
import { validate, createOrderSchema } from "../../../lib/validation";
```

#### **تحديث التحقق من البيانات:**
```javascript
// التحقق من صحة البيانات
const validation = validate(createOrderSchema, req.body);

if (!validation.success) {
  return res.status(400).json({
    success: false,
    message: "بيانات الطلب غير صحيحة",
    errors: validation.errors,
  });
}

const {
  customerName,
  customerPhone,
  customerEmail,
  address,
  city,
  notes,
  paymentMethod = "CASH",
} = validation.data;
```

---

### **3. `pages/checkout.js`** ✅

#### **إضافة State للأخطاء:**
```javascript
const [errors, setErrors] = useState({});
```

#### **تحديث `handleSubmit` مع التحقق:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setErrors({});
  setIsSubmitting(true);

  // التحقق من رقم الهاتف المصري
  const egyptianPhoneRegex = /^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/;
  if (!egyptianPhoneRegex.test(formData.customerPhone)) {
    setError("رقم الهاتف يجب أن يكون مصري صحيح (مثال: +201012345678 أو 01012345678)");
    setIsSubmitting(false);
    return;
  }

  // ... باقي الكود
};
```

#### **تحديث حقل رقم الهاتف:**
```javascript
<div className={styles.formGroup}>
  <label>رقم الهاتف * (مثال: +201012345678 أو 01012345678)</label>
  <input
    type="tel"
    value={formData.customerPhone}
    onChange={(e) =>
      setFormData({ ...formData, customerPhone: e.target.value })
    }
    placeholder="+201012345678"
    required
  />
  {errors.customerPhone && (
    <span className={styles.errorText}>{errors.customerPhone}</span>
  )}
</div>
```

#### **تحذير إذا لم يكن لدى المستخدم رقم هاتف:**
```javascript
useEffect(() => {
  if (user) {
    fetchCart();
    setFormData((prev) => ({
      ...prev,
      customerName: user.name || "",
      customerPhone: user.phone || "",
    }));
    
    // تحذير إذا لم يكن لدى المستخدم رقم هاتف
    if (!user.phone) {
      setError("⚠️ يرجى إضافة رقم هاتف في ملفك الشخصي أولاً");
    }
  }
}, [user]);
```

---

### **4. `styles/Checkout.module.css`** ✅

#### **إضافة CSS للأخطاء:**
```css
.errorText {
  display: block;
  color: var(--error);
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
}
```

---

## 📊 **ملخص التحديثات:**

### **الملفات المحدثة (4 ملفات):**
1. ✅ `lib/validation.js` - إضافة Regex وschemas
2. ✅ `pages/api/orders/index.js` - التحقق من البيانات
3. ✅ `pages/checkout.js` - التحقق في Frontend
4. ✅ `styles/Checkout.module.css` - CSS للأخطاء

---

## 🧪 **اختبار التحديثات:**

### **1. اختبار رقم هاتف صحيح:**
```
1. افتح: http://localhost:3000/checkout
2. أدخل رقم: +201012345678
3. املأ باقي البيانات
4. اضغط "إتمام الطلب"
5. النتيجة: ✅ يجب أن ينجح الطلب
```

### **2. اختبار رقم هاتف خاطئ:**
```
1. افتح: http://localhost:3000/checkout
2. أدخل رقم: +966501234567 (سعودي)
3. اضغط "إتمام الطلب"
4. النتيجة: ❌ رسالة خطأ: "رقم الهاتف يجب أن يكون مصري صحيح"
```

### **3. اختبار بدون رقم هاتف في Profile:**
```
1. سجل دخول بحساب بدون رقم هاتف
2. افتح: http://localhost:3000/checkout
3. النتيجة: ⚠️ رسالة تحذير: "يرجى إضافة رقم هاتف في ملفك الشخصي أولاً"
```

---

## ✅ **النتيجة النهائية:**

**🎉 تم إضافة التحقق من رقم الهاتف المصري بنجاح!**

- ✅ **رقم الهاتف إلزامي** لإنشاء طلب
- ✅ **يجب أن يكون مصري** (+20 أو 01)
- ✅ **التحقق في Frontend** (صفحة checkout)
- ✅ **التحقق في Backend** (API)
- ✅ **رسائل خطأ واضحة** بالعربية
- ✅ **تحذير للمستخدم** إذا لم يكن لديه رقم هاتف

---

## 🎊 **مبروك!**

**النظام الآن يتحقق من رقم الهاتف المصري!** 🇪🇬📱

