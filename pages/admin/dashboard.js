import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/Dashboard.module.css";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex-center" style={{ minHeight: "400px" }}>
          <div className="loading"></div>
        </div>
      </Layout>
    );
  }

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <Layout>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <h1>لوحة تحكم الإدارة</h1>
          <p>مرحباً، {user.name}</p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📦</div>
            <h3>المنتجات</h3>
            <p className={styles.statValue}>-</p>
            <Link href="/admin/products" className={styles.statLink}>
              إدارة المنتجات →
            </Link>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>📂</div>
            <h3>الفئات</h3>
            <p className={styles.statValue}>-</p>
            <Link href="/admin/categories" className={styles.statLink}>
              إدارة الفئات →
            </Link>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🛒</div>
            <h3>الطلبات</h3>
            <p className={styles.statValue}>-</p>
            <Link href="/admin/orders" className={styles.statLink}>
              إدارة الطلبات →
            </Link>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <h3>المستخدمين</h3>
            <p className={styles.statValue}>-</p>
            <Link href="/admin/users" className={styles.statLink}>
              إدارة المستخدمين →
            </Link>
          </div>
        </div>

        <div className={styles.quickActions}>
          <h2>إجراءات سريعة</h2>
          <div className={styles.actionsGrid}>
            <Link href="/admin/categories" className={styles.actionCard}>
              <span className={styles.actionIcon}>➕</span>
              <span>إضافة فئة جديدة</span>
            </Link>

            <Link href="/admin/products" className={styles.actionCard}>
              <span className={styles.actionIcon}>➕</span>
              <span>إضافة منتج جديد</span>
            </Link>

            <Link href="/admin/orders" className={styles.actionCard}>
              <span className={styles.actionIcon}>📋</span>
              <span>عرض الطلبات الجديدة</span>
            </Link>

            <Link href="/admin/reports" className={styles.actionCard}>
              <span className={styles.actionIcon}>📊</span>
              <span>التقارير والإحصائيات</span>
            </Link>
          </div>
        </div>

        <div className={styles.recentActivity}>
          <h2>النشاط الأخير</h2>
          <div className={styles.activityList}>
            <p className={styles.emptyState}>لا توجد أنشطة حديثة</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

