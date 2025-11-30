import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styles from "../../styles/Admin.module.css";

export default function AdminProducts() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    price: "",
    categoryId: "",
    stock: "",
    isAvailable: true,
    size: "",
    weight: "",
    sku: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      fetchProducts();
      fetchCategories();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
        setFilteredProducts(data.products);
      }
    } catch (err) {
      setError("فشل في تحميل المنتجات");
    } finally {
      setIsLoading(false);
    }
  };

  // تصفية المنتجات محلياً (بدون طلبات API متكررة)
  useEffect(() => {
    let filtered = products;

    // تصفية حسب البحث
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.nameEn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.descriptionAr?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // تصفية حسب الفئة
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.categoryId === parseInt(categoryFilter)
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, categoryFilter, products]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories.filter(cat => cat.isActive));
      }
    } catch (err) {
      console.error("فشل في تحميل الفئات");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setShowModal(false);
        resetForm();
        fetchProducts();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء حفظ المنتج");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nameAr: product.nameAr,
      nameEn: product.nameEn || "",
      descriptionAr: product.descriptionAr || "",
      descriptionEn: product.descriptionEn || "",
      price: product.price,
      categoryId: product.categoryId,
      stock: product.stock,
      isAvailable: product.isAvailable,
      size: product.size || "",
      weight: product.weight || "",
      sku: product.sku || "",
    });
    setImagePreview(product.imageUrl);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        fetchProducts();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء حذف المنتج");
    }
  };

  const resetForm = () => {
    setFormData({
      nameAr: "",
      nameEn: "",
      descriptionAr: "",
      descriptionEn: "",
      price: "",
      categoryId: "",
      stock: "",
      isAvailable: true,
      size: "",
      weight: "",
      sku: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
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

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return (
    <Layout>
      <div className={styles.adminContainer}>
        <div className={styles.header}>
          <h1>☕ إدارة المنتجات</h1>
          <button onClick={openAddModal} className="btn btn-primary">
            ➕ إضافة منتج جديد
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* فلاتر البحث */}
        <div className={styles.filters}>
          <div className={styles.filterRow}>
            <div className={styles.formGroup}>
              <input
                type="text"
                placeholder="🔍 ابحث عن منتج..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <div className={styles.formGroup}>
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
            {(searchQuery || categoryFilter) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("");
                }}
                className="btn btn-secondary"
              >
                🔄 إعادة تعيين
              </button>
            )}
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>الصورة</th>
                <th>الاسم</th>
                <th>الفئة</th>
                <th>السعر</th>
                <th>المخزون</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>
                    {searchQuery || categoryFilter
                      ? "🔍 لا توجد منتجات تطابق البحث"
                      : "📦 لا توجد منتجات"}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.nameAr}
                        className={styles.productImage}
                      />
                    ) : (
                      <div className={styles.noImage}>لا توجد صورة</div>
                    )}
                  </td>
                  <td>
                    <div className={styles.productName}>{product.nameAr}</div>
                    {product.nameEn && (
                      <div className={styles.productNameEn}>{product.nameEn}</div>
                    )}
                  </td>
                  <td>{product.category?.nameAr}</td>
                  <td>{product.price} ج.م</td>
                  <td>
                    <span className={product.stock > 10 ? styles.stockGood : styles.stockLow}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`${styles.badge} ${
                        product.isAvailable ? styles.badgeSuccess : styles.badgeDanger
                      }`}
                    >
                      {product.isAvailable ? "متاح" : "غير متاح"}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn btn-sm btn-info"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="btn btn-sm btn-danger"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>{editingProduct ? "تعديل منتج" : "إضافة منتج جديد"}</h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={styles.closeButton}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>الاسم بالعربية *</label>
                    <input
                      type="text"
                      name="nameAr"
                      value={formData.nameAr}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>الاسم بالإنجليزية</label>
                    <input
                      type="text"
                      name="nameEn"
                      value={formData.nameEn}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>الوصف بالعربية</label>
                  <textarea
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الوصف بالإنجليزية</label>
                  <textarea
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>السعر (ج.م) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>الفئة *</label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">اختر الفئة</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nameAr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>المخزون</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>رمز المنتج (SKU)</label>
                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>الحجم</label>
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleInputChange}
                      placeholder="مثال: 250 مل"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>الوزن</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="مثال: 500 جرام"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkbox}>
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={formData.isAvailable}
                      onChange={handleInputChange}
                    />
                    <span>متاح للبيع</span>
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <label>صورة المنتج</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className={styles.imagePreview}>
                      <img src={imagePreview} alt="معاينة" />
                    </div>
                  )}
                </div>

                <div className={styles.modalActions}>
                  <button type="submit" className="btn btn-primary">
                    {editingProduct ? "حفظ التعديلات" : "إضافة المنتج"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="btn btn-secondary"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}


