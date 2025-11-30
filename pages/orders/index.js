import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/Orders.module.css";

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

export default function Orders() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      setError("فشل في تحميل الطلبات");
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

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>📦 طلباتي</h1>
          <Link href="/products" className={styles.shopBtn}>
            متابعة التسوق
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {orders.length > 0 ? (
          <div className={styles.ordersList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <h3>طلب رقم: {order.orderNumber}</h3>
                    <p className={styles.orderDate}>
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className={`badge badge-${STATUS_COLORS[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>
                </div>

                <div className={styles.orderBody}>
                  <div className={styles.orderInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>العميل:</span>
                      <span>{order.customerName}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>الهاتف:</span>
                      <span>{order.customerPhone}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>العنوان:</span>
                      <span>{order.address}, {order.city}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>طريقة الدفع:</span>
                      <span>
                        {order.paymentMethod === "CASH" && "💵 الدفع عند الاستلام"}
                        
                        {/* {order.paymentMethod === "CARD" && "💳 بطاقة ائتمانية"} */}
                        {/* {order.paymentMethod === "ONLINE" && "🌐 الدفع الإلكتروني"} */}
                      </span>
                    </div>
                  </div>

                  <div className={styles.orderItems}>
                    <h4>المنتجات:</h4>
                    {order.items.map((item) => (
                      <div key={item.id} className={styles.orderItem}>
                        <span>
                          {item.nameAr} × {item.quantity}
                        </span>
                        <span>{(item.price * item.quantity).toFixed(2)} ج.م</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.orderTotal}>
                    <span>الإجمالي:</span>
                    <span className={styles.totalAmount}>
                      {Number(order.totalAmount).toFixed(2)} ج.م
                    </span>
                  </div>
                  <Link href={`/orders/${order.id}`} className={styles.viewBtn}>
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>📦 لا توجد طلبات حالياً</p>
            <Link href="/products" className={styles.shopBtn}>
              ابدأ التسوق الآن
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

