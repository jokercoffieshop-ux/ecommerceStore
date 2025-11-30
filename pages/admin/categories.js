import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styles from "../../styles/Admin.module.css";

export default function AdminCategories() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    isActive: true,
    order: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      fetchCategories();
    }
  }, [user]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      setError("فشل في تحميل الفئات");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formDataToSend = new FormData();
    formDataToSend.append("nameAr", formData.nameAr);
    formDataToSend.append("nameEn", formData.nameEn);
    formDataToSend.append("descriptionAr", formData.descriptionAr);
    formDataToSend.append("descriptionEn", formData.descriptionEn);
    formDataToSend.append("isActive", formData.isActive);
    formDataToSend.append("order", formData.order);
    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    try {
      const url = editingCategory
        ? `/api/categories/${editingCategory.id}`
        : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        setShowModal(false);
        resetForm();
        fetchCategories();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء حفظ الفئة");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(data.message);
        fetchCategories();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء حذف الفئة");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      nameAr: category.nameAr,
      nameEn: category.nameEn || "",
      descriptionAr: category.descriptionAr || "",
      descriptionEn: category.descriptionEn || "",
      isActive: category.isActive,
      order: category.order,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      nameAr: "",
      nameEn: "",
      descriptionAr: "",
      descriptionEn: "",
      isActive: true,
      order: 0,
    });
    setImageFile(null);
    setEditingCategory(null);
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
          <h1>إدارة الفئات</h1>
          <button
            className={styles.btnPrimary}
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + إضافة فئة جديدة
          </button>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className={styles.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>الصورة</th>
                <th>الاسم بالعربية</th>
                <th>الاسم بالإنجليزية</th>
                <th>عدد المنتجات</th>
                <th>الحالة</th>
                <th>الترتيب</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>
                    {category.imageUrl ? (
                      <img
                        src={category.imageUrl}
                        alt={category.nameAr}
                        className={styles.categoryImage}
                      />
                    ) : (
                      <div className={styles.noImage}>لا توجد صورة</div>
                    )}
                  </td>
                  <td>{category.nameAr}</td>
                  <td>{category.nameEn || "-"}</td>
                  <td>{category._count?.products || 0}</td>
                  <td>
                    <span
                      className={`badge ${
                        category.isActive ? "badge-success" : "badge-danger"
                      }`}
                    >
                      {category.isActive ? "نشط" : "غير نشط"}
                    </span>
                  </td>
                  <td>{category.order}</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.btnEdit}
                        onClick={() => handleEdit(category)}
                      >
                        تعديل
                      </button>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDelete(category.id)}
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {categories.length === 0 && (
            <div className={styles.emptyState}>
              <p>لا توجد فئات حالياً</p>
              <button
                className={styles.btnPrimary}
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
              >
                إضافة فئة جديدة
              </button>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2>{editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}</h2>
                <button
                  className={styles.closeBtn}
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>الاسم بالعربية *</label>
                  <input
                    type="text"
                    value={formData.nameAr}
                    onChange={(e) =>
                      setFormData({ ...formData, nameAr: e.target.value })
                    }
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    value={formData.nameEn}
                    onChange={(e) =>
                      setFormData({ ...formData, nameEn: e.target.value })
                    }
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الوصف بالعربية</label>
                  <textarea
                    value={formData.descriptionAr}
                    onChange={(e) =>
                      setFormData({ ...formData, descriptionAr: e.target.value })
                    }
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الوصف بالإنجليزية</label>
                  <textarea
                    value={formData.descriptionEn}
                    onChange={(e) =>
                      setFormData({ ...formData, descriptionEn: e.target.value })
                    }
                    rows="3"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الصورة</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>الترتيب</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({ ...formData, order: parseInt(e.target.value) })
                      }
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({ ...formData, isActive: e.target.checked })
                        }
                      />
                      <span>نشط</span>
                    </label>
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <button type="submit" className={styles.btnPrimary}>
                    {editingCategory ? "حفظ التعديلات" : "إضافة الفئة"}
                  </button>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
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
