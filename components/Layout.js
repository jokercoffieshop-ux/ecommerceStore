import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            ☕ بن تركي
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className={styles.mobileMenuToggle}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <span className={styles.closeIcon}>✕</span>
            ) : (
              <span className={styles.hamburgerIcon}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            )}
          </button>

          {/* Desktop & Mobile Navigation */}
          <div className={`${styles.navLinks} ${mobileMenuOpen ? styles.navLinksOpen : ''}`}>
            {/* Common Links */}
            <Link href="/" onClick={closeMobileMenu}>الرئيسية</Link>
            <Link href="/about" onClick={closeMobileMenu}>من نحن</Link>

            {user ? (
              <>
                {/* Admin Links */}
                {user.role === "ADMIN" && (
                  <>
                    <Link href="/admin/categories" onClick={closeMobileMenu}>
                      📂 الفئات
                    </Link>
                    <Link href="/admin/products" onClick={closeMobileMenu}>
                      📦 المنتجات
                    </Link>
                    <Link href="/admin/orders" onClick={closeMobileMenu}>
                      📋 الطلبات
                    </Link>
                    <Link href="/admin/users" onClick={closeMobileMenu}>
                      المستخدمين
                    </Link>
                  </>
                )}

                {/* Staff Links */}
                {user.role === "STAFF" && (
                  <>
                    <Link href="/staff/products" onClick={closeMobileMenu}>
                      📦 المنتجات
                    </Link>
                    <Link href="/staff/orders" onClick={closeMobileMenu}>
                      📋 الطلبات
                    </Link>
                  </>
                )}

                {/* Client Links */}
                {user.role === "CLIENT" && (
                  <>
                    <Link href="/products" onClick={closeMobileMenu}>
                      🛍️ المنتجات
                    </Link>
                    <Link href="/cart" onClick={closeMobileMenu}>
                      🛒 السلة
                    </Link>
                    <Link href="/orders" onClick={closeMobileMenu}>
                      📦 طلباتي
                    </Link>
                  </>
                )}

                {/* User Menu */}
                <div className={styles.userMenu}>
                  <span className={styles.userName}>👤 {user.name}</span>
                  <Link href="/profile" onClick={closeMobileMenu}>
                    ⚙️ الملف الشخصي
                  </Link>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    🚪 تسجيل الخروج
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/products" onClick={closeMobileMenu}>
                  🛍️ المنتجات
                </Link>
                <Link href="/login" onClick={closeMobileMenu}>
                  🔑 تسجيل الدخول
                </Link>
                <Link href="/register" onClick={closeMobileMenu}>
                  ✨ إنشاء حساب
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={closeMobileMenu}
        ></div>
      )}

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h3>☕ بن تركي</h3>
            <p>أصالة القهوة العربية في كل فنجان</p>
          </div>

          <div className={styles.footerSection}>
            <h4>روابط سريعة</h4>
            <ul>
              <li><Link href="/products">المنتجات</Link></li>
              <li><Link href="/about">من نحن</Link></li> 
            </ul>
          </div>

           

          <div className={styles.footerSection}>
            <h4>تواصل معنا</h4>
            <ul>
              <li>jokercoffieshop@gmail.com</li>
              <li>📱 +20 1028975556</li>
              <li>📍 الخانكه ، جمهورية مصر العربية</li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
         <p>© 2025 بن تركي — جميع الحقوق محفوظة.</p>

        </div>
      </footer>
    </div>
  );
}

