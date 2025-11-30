/**
 * Login Page
 * User authentication with email and password
 */

import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import Link from "next/link";
import styles from "../styles/Auth.module.css";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      // Redirect based on user role
      const role = result.user.role;
      if (role === "ADMIN") {
        router.push("/admin/categories");
      } else if (role === "STAFF") {
        router.push("/staff/orders");
      } else {
        router.push("/products");
      }
    } else {
      if (result.requiresVerification) {
        setMessage("يرجى التحقق من بريدك الإلكتروني قبل تسجيل الدخول");
        // Redirect to OTP verification page
        setTimeout(() => {
          router.push(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
        }, 2000);
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
          <h1 className={styles.authTitle}>تسجيل الدخول</h1>
          <p className={styles.authSubtitle}>مرحباً بعودتك إلى متجر القهوة</p>

          {message && (
            <div className="alert alert-error">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.authForm}>
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
                placeholder="أدخل كلمة المرور"
              />
              {errors.password && <span className={styles.error}>{errors.password}</span>}
            </div>

            <div className={styles.forgotPassword}>
              <Link href="/forgot-password">نسيت كلمة المرور؟</Link>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          <p className={styles.authFooter}>
            ليس لديك حساب؟{" "}
            <Link href="/register">إنشاء حساب جديد</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
