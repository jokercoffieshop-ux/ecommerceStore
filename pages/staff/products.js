import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "../../styles/Admin.module.css";

export default function StaffProducts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && (!user || (user.role !== "STAFF" && user.role !== "ADMIN"))) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchCategories();
    }
  }, [user, categoryFilter, searchQuery]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      let url = "/api/products?";
      if (categoryFilter) url += `category=${categoryFilter}&`;
      if (searchQuery) url += `search=${searchQuery}&`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("فشل في تحميل المنتجات");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("فشل في تحميل الفئات");
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

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <div className={styles.header}>
          <h1>عرض المنتجات</h1>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className={styles.filters}>
          <div className={styles.filterRow}>
            <div className={styles.formGroup}>
              <label>البحث</label>
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>الفئة</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">جميع الفئات</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nameAr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <p>لا توجد منتجات</p>
          </div>
        ) : (
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>الصورة</th>
                  <th>الاسم</th>
                  <th>الفئة</th>
                  <th>السعر</th>
                  <th>المخزون</th>
                  <th>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.nameAr}
                          className={styles.productImage}
                        />
                      ) : (
                        <div className={styles.noImage}>لا توجد صورة</div>
                      )}
                    </td>
                    <td>
                      <div className={styles.productName}>{product.nameAr}</div>
                      <div className={styles.productNameEn}>{product.nameEn}</div>
                    </td>
                    <td>{product.category?.nameAr || "-"}</td>
                    <td>{product.price} ج.م</td>
                    <td>
                      <span className={product.stock > 10 ? styles.stockGood : styles.stockLow}>
                        {product.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${product.isAvailable ? styles.badgeSuccess : styles.badgeDanger}`}>
                        {product.isAvailable ? "متاح" : "غير متاح"}
                      </span>
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

