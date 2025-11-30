import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styles from "../../styles/Admin.module.css";

export default function AdminUsers() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // Filters
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "CLIENT",
    isVerified: false,
    password: "",
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "ADMIN")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      fetchUsers();
    }
  }, [user, roleFilter, searchQuery, pagination.page]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
      });
      
      if (roleFilter !== "ALL") {
        params.append("role", roleFilter);
      }
      
      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await fetch(`/api/admin/users?${params}`);
      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
        setPagination(prev => ({ ...prev, ...data.pagination }));
      } else {
        setError(data.message || "فشل في تحميل المستخدمين");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("حدث خطأ في تحميل المستخدمين");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`);
      const data = await response.json();

      if (response.ok) {
        setSelectedUser(data.user);
        setShowDetailsModal(true);
      } else {
        setError(data.message || "فشل في تحميل بيانات المستخدم");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("حدث خطأ في تحميل بيانات المستخدم");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      isVerified: user.isVerified,
      password: "",
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("تم تحديث بيانات المستخدم بنجاح");
        setShowEditModal(false);
        fetchUsers();
      } else {
        setError(data.message || "فشل في تحديث بيانات المستخدم");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setError("حدث خطأ في تحديث بيانات المستخدم");
    }
  };

  const handleDelete = async (force = false) => {
    setError(null);
    setSuccess(null);

    try {
      const url = `/api/admin/users/${selectedUser.id}${force ? "?force=true" : ""}`;
      const response = await fetch(url, { method: "DELETE" });
      const data = await response.json();

      if (response.ok) {
        setSuccess("تم حذف المستخدم بنجاح");
        setShowDeleteModal(false);
        fetchUsers();
      } else {
        if (data.hasOrders) {
          if (window.confirm(data.message)) {
            handleDelete(true);
          }
        } else {
          setError(data.message || "فشل في حذف المستخدم");
        }
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("حدث خطأ في حذف المستخدم");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchUsers();
  };

  const getRoleBadge = (role) => {
    const badges = {
      ADMIN: { text: "مدير", class: styles.badgeAdmin },
      STAFF: { text: "موظف", class: styles.badgeStaff },
      CLIENT: { text: "عميل", class: styles.badgeClient },
    };
    return badges[role] || badges.CLIENT;
  };

  if (loading || !user) {
    return (
      <Layout>
        <div className="flex-center" style={{ minHeight: "400px" }}>
          <div className="loading"></div>
        </div>
      </Layout>
    );
  }

  if (user.role !== "ADMIN") {
    return null;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>إدارة المستخدمين</h1>
          <p>عرض وإدارة جميع حسابات المستخدمين</p>
        </div>

        {error && (
          <div className={styles.alert} style={{ backgroundColor: "#fee", color: "#c33" }}>
            {error}
          </div>
        )}

        {success && (
          <div className={styles.alert} style={{ backgroundColor: "#efe", color: "#3a3" }}>
            {success}
          </div>
        )}

        {/* Filters */}
        <div className={styles.filters}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="البحث بالاسم، البريد، أو الهاتف..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              🔍 بحث
            </button>
          </form>

          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className={styles.filterSelect}
          >
            <option value="ALL">جميع الأدوار</option>
            <option value="CLIENT">عملاء</option>
            <option value="STAFF">موظفين</option>
            <option value="ADMIN">مدراء</option>
          </select>
        </div>

        {/* Users Table */}
        {isLoading ? (
          <div className="flex-center" style={{ minHeight: "300px" }}>
            <div className="loading"></div>
          </div>
        ) : users.length === 0 ? (
          <div className={styles.emptyState}>
            <p>لا يوجد مستخدمين</p>
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>المعرف</th>
                    <th>الاسم</th>
                    <th>البريد الإلكتروني</th>
                    <th>الهاتف</th>
                    <th>الدور</th>
                    <th>التحقق</th>
                    <th>الطلبات</th>
                    <th>تاريخ التسجيل</th>
                    <th>الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((usr) => (
                    <tr key={usr.id}>
                      <td>{usr.id}</td>
                      <td>
                        <div className={styles.userCell}>
                          {usr.avatarUrl && (
                            <img src={usr.avatarUrl} alt={usr.name} className={styles.avatar} />
                          )}
                          {usr.name}
                        </div>
                      </td>
                      <td>{usr.email}</td>
                      <td>{usr.phone || "-"}</td>
                      <td>
                        <span className={getRoleBadge(usr.role).class}>
                          {getRoleBadge(usr.role).text}
                        </span>
                      </td>
                      <td>
                        {usr.isVerified ? (
                          <span className={styles.badgeSuccess}>✓ موثق</span>
                        ) : (
                          <span className={styles.badgeWarning}>✗ غير موثق</span>
                        )}
                      </td>
                      <td>{usr._count.orders}</td>
                      <td>{new Date(usr.createdAt).toLocaleDateString("ar-EG")}</td>
                      <td>
                        <div className={styles.actions}>
                          <button
                            onClick={() => fetchUserDetails(usr.id)}
                            className={styles.btnView}
                            title="عرض التفاصيل"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => handleEdit(usr)}
                            className={styles.btnEdit}
                            title="تعديل"
                            disabled={usr.id === user.id}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(usr);
                              setShowDeleteModal(true);
                            }}
                            className={styles.btnDelete}
                            title="حذف"
                            disabled={usr.id === user.id}
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className={styles.paginationBtn}
              >
                السابق
              </button>
              <span className={styles.paginationInfo}>
                صفحة {pagination.page} من {pagination.totalPages} (إجمالي: {pagination.total})
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page >= pagination.totalPages}
                className={styles.paginationBtn}
              >
                التالي
              </button>
            </div>
          </>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>تعديل بيانات المستخدم</h2>
              <form onSubmit={handleUpdate}>
                <div className={styles.formGroup}>
                  <label>الاسم</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الهاتف</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+201012345678"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>الدور</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="CLIENT">عميل</option>
                    <option value="STAFF">موظف</option>
                    <option value="ADMIN">مدير</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData.isVerified}
                      onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    />
                    حساب موثق
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <label>كلمة مرور جديدة (اختياري)</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="اتركه فارغاً إذا لم ترد التغيير"
                  />
                </div>

                <div className={styles.modalActions}>
                  <button type="submit" className={styles.btnPrimary}>
                    حفظ التغييرات
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className={styles.btnSecondary}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>تأكيد الحذف</h2>
              <p>هل أنت متأكد من حذف المستخدم "{selectedUser?.name}"؟</p>
              {selectedUser?._count?.orders > 0 && (
                <p className={styles.warning}>
                  تحذير: المستخدم لديه {selectedUser._count.orders} طلب
                </p>
              )}
              <div className={styles.modalActions}>
                <button
                  onClick={() => handleDelete(false)}
                  className={styles.btnDanger}
                >
                  نعم، احذف
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className={styles.btnSecondary}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedUser && (
          <div className={styles.modal}>
            <div className={styles.modalContent} style={{ maxWidth: "700px" }}>
              <h2>تفاصيل المستخدم</h2>
              
              <div className={styles.userDetails}>
                <div className={styles.detailSection}>
                  <h3>المعلومات الأساسية</h3>
                  <div className={styles.detailRow}>
                    <strong>المعرف:</strong>
                    <span>{selectedUser.id}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>الاسم:</strong>
                    <span>{selectedUser.name}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>البريد الإلكتروني:</strong>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>الهاتف:</strong>
                    <span>{selectedUser.phone || "-"}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>الدور:</strong>
                    <span className={getRoleBadge(selectedUser.role).class}>
                      {getRoleBadge(selectedUser.role).text}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>حالة التحقق:</strong>
                    <span>
                      {selectedUser.isVerified ? (
                        <span className={styles.badgeSuccess}>موثق</span>
                      ) : (
                        <span className={styles.badgeWarning}>غير موثق</span>
                      )}
                    </span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>تاريخ التسجيل:</strong>
                    <span>{new Date(selectedUser.createdAt).toLocaleString("ar-EG")}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>آخر تحديث:</strong>
                    <span>{new Date(selectedUser.updatedAt).toLocaleString("ar-EG")}</span>
                  </div>
                </div>

                <div className={styles.detailSection}>
                  <h3>الإحصائيات</h3>
                  <div className={styles.detailRow}>
                    <strong>عدد الطلبات:</strong>
                    <span>{selectedUser._count.orders}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <strong>رموز التحقق:</strong>
                    <span>{selectedUser._count.otps}</span>
                  </div>
                </div>

                {selectedUser.orders && selectedUser.orders.length > 0 && (
                  <div className={styles.detailSection}>
                    <h3>آخر الطلبات</h3>
                    <div className={styles.ordersList}>
                      {selectedUser.orders.map((order) => (
                        <div key={order.id} className={styles.orderItem}>
                          <div>
                            <strong>{order.orderNumber}</strong>
                            <span className={styles.orderStatus}>{order.status}</span>
                          </div>
                          <div>
                            <span>{order.totalAmount} جنيه</span>
                            <span className={styles.orderDate}>
                              {new Date(order.createdAt).toLocaleDateString("ar-EG")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.modalActions}>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className={styles.btnSecondary}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
