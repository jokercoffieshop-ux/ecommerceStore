import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";

export default function StaffOrders() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    if (!loading && (!user || (user.role !== "STAFF" && user.role !== "ADMIN"))) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, statusFilter]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const url = statusFilter
        ? `/api/orders?status=${statusFilter}`
        : "/api/orders";

      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("فشل في تحميل الطلبات");
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("تم تحديث حالة الطلب بنجاح");
        fetchOrders();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("فشل في تحديث حالة الطلب");
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

  if (!user || (user.role !== "STAFF" && user.role !== "ADMIN")) {
    return null;
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { label: "قيد الانتظار", class: "badgeWarning" },
      PROCESSING: { label: "قيد التحضير", class: "badgeInfo" },
      SHIPPED: { label: "تم الشحن", class: "badgePrimary" },
      DELIVERED: { label: "تم التسليم", class: "badgeSuccess" },
      CANCELLED: { label: "ملغي", class: "badgeDanger" },
      REFUNDED: { label: "مسترجع", class: "badgeSecondary" },
    };
    const statusInfo = statusMap[status] || { label: status, class: "badgeSecondary" };
    return <span className={`${styles.badge} ${styles[statusInfo.class]}`}>{statusInfo.label}</span>;
  };

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <div className={styles.header}>
          <h1>إدارة الطلبات</h1>
          <div className={styles.headerActions}>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="">جميع الحالات</option>
              <option value="PENDING">قيد الانتظار</option>
              <option value="PROCESSING">قيد التحضير</option>
              <option value="SHIPPED">تم الشحن</option>
              <option value="DELIVERED">تم التسليم</option>
              <option value="CANCELLED">ملغي</option>
              <option value="REFUNDED">مسترجع</option>
            </select>
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {orders.length === 0 ? (
          <div className={styles.emptyState}>
            <p>لا توجد طلبات</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>العميل</th>
                  <th>المبلغ</th>
                  <th>الحالة</th>
                  <th>التاريخ</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.orderNumber}</td>
                    <td>{order.customerName}</td>
                    <td>{order.totalAmount} ج.م</td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString("ar-SA")}</td>
                    <td>
                      <div className={styles.actionButtons}>
                        <Link href={`/orders/${order.id}`} className="btn btn-sm btn-primary">
                          عرض
                        </Link>
                        {order.status === "PENDING" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "PROCESSING")}
                            className="btn btn-sm btn-info"
                          >
                            بدء التحضير
                          </button>
                        )}
                        {order.status === "PROCESSING" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                            className="btn btn-sm btn-primary"
                          >
                            شحن
                          </button>
                        )}
                        {order.status === "SHIPPED" && (
                          <button
                            onClick={() => updateOrderStatus(order.id, "DELIVERED")}
                            className="btn btn-sm btn-success"
                          >
                            تم التسليم
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
