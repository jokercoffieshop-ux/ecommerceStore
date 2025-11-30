/**
 * Register Page
 * User registration with name, email, password, phone, and avatar upload
 */

import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import Link from "next/link";
import styles from "../styles/Auth.module.css";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      // Create preview
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

    // Create FormData for file upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.phone) data.append("phone", formData.phone);
    if (avatar) data.append("avatar", avatar);

    const result = await register(data);

    if (result.success) {
      setMessage(result.message);
      // Redirect to OTP verification page after 2 seconds
      setTimeout(() => {
        router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      }, 2000);
    } else {
      if (result.errors) {
        setErrors(result.errors);
      } else {
        setMessage(result.message);
      }
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>إنشاء حساب جديد</h1>
          <p className={styles.authSubtitle}>انضم إلى متجر القهوة واستمتع بأفضل العروض</p>

          {message && (
            <div className={message.includes("نجح") || message.includes("success") ? "alert alert-success" : "alert alert-error"}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label>الاسم الكامل</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="أدخل اسمك الكامل"
              />
              {errors.name && <span className={styles.error}>{errors.name}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
              />
              {errors.email && <span className={styles.error}>{errors.email}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>كلمة المرور</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="8 أحرف على الأقل، حرف كبير ورقم"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>رقم الهاتف (اختياري)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+966xxxxxxxxx"
              />
              {errors.phone && <span className={styles.error}>{errors.phone}</span>}
            </div>

            <div className={styles.formGroup}>
              <label>الصورة الشخصية (اختياري)</label>
              <div className={styles.fileUpload}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              {avatarPreview && (
                <div className={styles.filePreview}>
                  <img src={avatarPreview} alt="معاينة الصورة" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
            </button>
          </form>

          <p className={styles.authFooter}>
            لديك حساب بالفعل؟{" "}
            <Link href="/login">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
