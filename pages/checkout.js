import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styles from "../styles/Checkout.module.css";

export default function Checkout() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    address: "",
    city: "",
    paymentMethod: "CASH",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

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

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (data.success) {
        if (data.cart.items.length === 0) {
          router.push("/cart");
          return;
        }
        setCart(data.cart);
      }
    } catch (err) {
      setError("فشل في تحميل السلة");
    } finally {
      setIsLoading(false);
    }
  };

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

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        router.push(`/orders/${data.order.id}?success=true`);
      } else {
        setError(data.message);
        if (data.errors) {
          setErrors(data.errors);
        }
        setIsSubmitting(false);
      }
    } catch (err) {
      setError("حدث خطأ أثناء إنشاء الطلب");
      setIsSubmitting(false);
    }
  };

  if (loading || isLoading) {
    return (
      <Layout>
        <div className="flex-center" style={{ minHeight: "400px" }}>
          <div className="loading"></div>
        </div>
      </Layout>
    );
  }

  if (!user || !cart) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1>إتمام الطلب</h1>

        {error && <div className="alert alert-error">{error}</div>}

        <div className={styles.checkoutContent}>
          <div className={styles.checkoutForm}>
            <form onSubmit={handleSubmit}>
              <h2>معلومات التوصيل</h2>

              <div className={styles.formGroup}>
                <label>الاسم الكامل *</label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  required
                />
              </div>

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

              <div className={styles.formGroup}>
                <label>العنوان *</label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  rows="3"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>المدينة *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>

              <h2>طريقة الدفع</h2>

              <div className={styles.paymentMethods}>
                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CASH"
                    checked={formData.paymentMethod === "CASH"}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                  />
                  <span>💵 الدفع عند الاستلام</span>
                </label>

                {/* <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CARD"
                    checked={formData.paymentMethod === "CARD"}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                  />
                  <span>💳 بطاقة ائتمانية</span>
                </label>

                <label className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ONLINE"
                    checked={formData.paymentMethod === "ONLINE"}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                  />
                  <span>🌐 الدفع الإلكتروني</span>
                </label> */}
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري إنشاء الطلب..." : "تأكيد الطلب"}
              </button>
            </form>
          </div>

          <div className={styles.orderSummary}>
            <h2>ملخص الطلب</h2>

            <div className={styles.summaryItems}>
              {cart.items.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <span>
                    {item.product.nameAr} × {item.quantity}
                  </span>
                  <span>{(item.product.price * item.quantity).toFixed(2)} ج.م</span>
                </div>
              ))}
            </div>

            <div className={styles.summaryTotal}>
              <span>الإجمالي:</span>
              <span>{cart.total.toFixed(2)} ج.م</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

