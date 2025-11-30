import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <h1 className={styles.storeName}>☕ بن تركي</h1>
            <div className={styles.logoLine}></div>
          </div>
          <p className={styles.tagline}>أصالة القهوة العربية في كل فنجان</p>
          <p className={styles.subtitle}>قهوتك المفضلة، طازجة إلى باب منزلك</p>

          {user ? (
            <div className={styles.userWelcome}>
              <p>مرحباً بعودتك، <strong>{user.name}</strong>!</p>
              <div className={styles.heroButtons}>
                <Link href="/products" className={styles.btnPrimary}>
                  تصفح المنتجات
                </Link>
                <Link href="/orders" className={styles.btnSecondary}>
                  طلباتي
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.heroButtons}>
              <Link href="/register" className={styles.btnPrimary}>
                ابدأ الآن
              </Link>
              <Link href="/login" className={styles.btnSecondary}>
                تسجيل الدخول
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>☕</div>
          <h3>جودة عالية</h3>
          <p>أفضل حبوب القهوة من مختلف أنحاء العالم</p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>🚀</div>
          <h3>توصيل سريع</h3>
          <p>قهوتك طازجة إلى باب منزلك في أسرع وقت</p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>🫘</div>
          <h3>حبوب طازجة</h3>
          <p>نحمص حبوب القهوة يومياً لضمان أفضل نكهة</p>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureIcon}>🎁</div>
          <h3>عروض خاصة</h3>
          <p>خصومات وعروض حصرية لعملائنا المميزين</p>
        </div>
      </div>

      {/* قسم أنواع القهوة */}
      <div className={styles.coffeeTypes}>
        <h2 className={styles.sectionTitle}>☕ أنواع القهوة المتوفرة</h2>
        <div className={styles.coffeeGrid}>
          <div className={styles.coffeeCard}>
            <div className={styles.coffeeEmoji}>☕</div>
            <h3>قهوة عربية</h3>
            <p>قهوة عربية أصيلة بنكهة الهيل والزعفران</p>
          </div>
          <div className={styles.coffeeCard}>
            <div className={styles.coffeeEmoji}>🍵</div>
            <h3>قهوة تركية</h3>
            <p>قهوة تركية مطحونة ناعماً بطريقة تقليدية</p>
          </div>
          <div className={styles.coffeeCard}>
            <div className={styles.coffeeEmoji}>☕</div>
            <h3>إسبريسو</h3>
            <p>قهوة إسبريسو إيطالية قوية ومركزة</p>
          </div>
          <div className={styles.coffeeCard}>
            <div className={styles.coffeeEmoji}>🥤</div>
            <h3>قهوة باردة</h3>
            <p>قهوة باردة منعشة مثالية للصيف</p>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <h2>جاهز لتجربة أفضل قهوة؟</h2>
        <p>انضم إلى آلاف العملاء السعداء واستمتع بقهوة استثنائية</p>
        <Link href="/products" className={styles.ctaBtn}>
          تصفح المنتجات الآن
        </Link>
      </div>
    </Layout>
  );
}
