import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/OrderDetails.module.css";

const STATUS_LABELS = {
  PENDING: "قيد الانتظار",
  PROCESSING: "قيد المعالجة",
  SHIPPED: "تم الشحن",
  DELIVERED: "تم التوصيل",
  CANCELLED: "ملغي",
  REFUNDED: "مسترجع",
};

const STATUS_COLORS = {
  PENDING: "warning",
  PROCESSING: "info",
  SHIPPED: "info",
  DELIVERED: "success",
  CANCELLED: "danger",
  REFUNDED: "secondary",
};

export default function OrderDetails() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id, success } = router.query;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && id) {
      fetchOrder();
    }
  }, [user, id]);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${id}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("فشل في تحميل تفاصيل الطلب");
    } finally {
      setIsLoading(false);
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

  if (!user || !order) {
    return (
      <Layout>
        <div className={styles.container}>
          {error && <div className="alert alert-error">{error}</div>}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {success && (
          <div className="alert alert-success">
            ✅ تم إنشاء طلبك بنجاح! سيتم التواصل معك قريباً.
          </div>
        )}

        <div className={styles.header}>
          <div>
            <h1>تفاصيل الطلب</h1>
            <p className={styles.orderNumber}>رقم الطلب: {order.orderNumber}</p>
          </div>
          <span className={`badge badge-${STATUS_COLORS[order.status]}`}>
            {STATUS_LABELS[order.status]}
          </span>
        </div>

        <div className={styles.orderContent}>
          <div className={styles.section}>
            <h2>معلومات العميل</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>الاسم:</span>
                <span>{order.customerName}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>الهاتف:</span>
                <span>{order.customerPhone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>العنوان:</span>
                <span>{order.address}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>المدينة:</span>
                <span>{order.city}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>طريقة الدفع:</span>
                <span>
                  {order.paymentMethod === "CASH" && "💵 الدفع عند الاستلام"}
                  {/* {order.paymentMethod === "CARD" && "💳 بطاقة ائتمانية"} */}
                  {/* {order.paymentMethod === "ONLINE" && "🌐 الدفع الإلكتروني"} */}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>تاريخ الطلب:</span>
                <span>
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>المنتجات</h2>
            <div className={styles.itemsList}>
              {order.items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemInfo}>
                    <h3>{item.nameAr}</h3>
                    <p>السعر: {item.price} ج.م</p>
                    <p>الكمية: {item.quantity}</p>
                  </div>
                  <div className={styles.itemTotal}>
                    {(item.price * item.quantity).toFixed(2)} ج.م
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderTotal}>
              <span>الإجمالي:</span>
              <span className={styles.totalAmount}>
                {Number(order.totalAmount).toFixed(2)} ج.م
              </span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link href="/orders" className={styles.backBtn}>
            العودة إلى الطلبات
          </Link>
          <Link href="/products" className={styles.shopBtn}>
            متابعة التسوق
          </Link>
        </div>
      </div>
    </Layout>
  );
}

