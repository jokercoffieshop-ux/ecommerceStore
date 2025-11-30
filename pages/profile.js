import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import styles from "../styles/Profile.module.css";

export default function Profile() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
      });
      setAvatarPreview(user.avatarUrl);
    }
  }, [user, authLoading, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    if (formData.phone) data.append("phone", formData.phone);
    if (avatar) data.append("avatar", avatar);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        setMessage("تم تحديث الملف الشخصي بنجاح");
        setMessageType("success");
        setEditing(false);
        setAvatar(null);
        setTimeout(() => setMessage(""), 3000);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setMessage(result.message);
          setMessageType("error");
        }
      }
    } catch (err) {
      setMessage("حدث خطأ أثناء تحديث الملف الشخصي");
      setMessageType("error");
    }

    setLoading(false);
  };

  if (authLoading || !user) {
    return (
      <Layout>
        <div className={styles.loading}>
          <div className="loading"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <h1>الملف الشخصي</h1>
            <div className={styles.headerLine}></div>
          </div>

          {message && (
            <div className={`${styles.alert} ${messageType === "success" ? styles.alertSuccess : styles.alertError}`}>
              {message}
            </div>
          )}

          {/* Avatar Section */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarContainer}>
              <img
                src={avatarPreview || "https://via.placeholder.com/200?text=صورة"}
                alt="Profile"
                className={styles.avatar}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200?text=صورة";
                }}
              />
              {editing && (
                <label className={styles.avatarUpload}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                  <span>📷 تغيير الصورة</span>
                </label>
              )}
            </div>
          </div>

          {!editing ? (
            // View Mode
            <div className={styles.profileInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>الاسم:</span>
                <span className={styles.infoValue}>{user.name}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>البريد الإلكتروني:</span>
                <span className={styles.infoValue}>{user.email}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>رقم الهاتف:</span>
                <span className={styles.infoValue}>{user.phone || "غير محدد"}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>الدور:</span>
                <span className={`${styles.badge} ${styles[`badge${user.role}`]}`}>
                  {user.role === "ADMIN" ? "مدير" : user.role === "STAFF" ? "موظف" : "عميل"}
                </span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>الحالة:</span>
                <span className={`${styles.badge} ${user.isVerified ? styles.badgeSuccess : styles.badgeWarning}`}>
                  {user.isVerified ? "✓ موثق" : "⚠ غير موثق"}
                </span>
              </div>

              <button
                className={styles.btnEdit}
                onClick={() => setEditing(true)}
              >
                ✏️ تعديل الملف الشخصي
              </button>
            </div>
          ) : (
            // Edit Mode
            <form onSubmit={handleSubmit} className={styles.profileForm}>
              <div className={styles.formGroup}>
                <label>الاسم الكامل *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={errors.name ? styles.inputError : ""}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>رقم الهاتف</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  className={errors.phone ? styles.inputError : ""}
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
              </div>

              <div className={styles.formActions}>
                <button
                  type="submit"
                  className={styles.btnSave}
                  disabled={loading}
                >
                  {loading ? "جاري الحفظ..." : "💾 حفظ التغييرات"}
                </button>
                <button
                  type="button"
                  className={styles.btnCancel}
                  onClick={() => {
                    setEditing(false);
                    setFormData({ name: user.name, phone: user.phone || "" });
                    setAvatarPreview(user.avatarUrl);
                    setAvatar(null);
                  }}
                >
                  ✖ إلغاء
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

