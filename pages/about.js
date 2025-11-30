import Layout from "../components/Layout";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>☕ عن بن تركي</h1>
            <div className={styles.divider}></div>
            <p className={styles.subtitle}>رحلة القهوة من الحبة إلى الفنجان</p>
          </div>
        </section>

        {/* Story Section */}
        <section className={styles.story}>
          <div className={styles.storyContent}>
            <div className={styles.storyText}>
              <h2 className={styles.sectionTitle}>قصتنا</h2>
              <p className={styles.paragraph}>
                بدأت رحلتنا في عام 2020 بحلم بسيط: تقديم أفضل أنواع القهوة العربية الأصيلة
                لعشاق القهوة في كل مكان. نحن نؤمن بأن كل فنجان قهوة يحكي قصة، ونسعى لجعل
                كل قصة استثنائية.
              </p>
              <p className={styles.paragraph}>
                نختار حبوب القهوة بعناية فائقة من أفضل المزارع حول العالم، ونحمصها بحرفية
                عالية للحفاظ على نكهتها الفريدة وجودتها العالية.
              </p>
            </div>
            <div className={styles.storyImage}>
              <div className={styles.coffeeIcon}>☕</div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.values}>
          <h2 className={styles.sectionTitle}>قيمنا</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌟</div>
              <h3>الجودة</h3>
              <p>نلتزم بأعلى معايير الجودة في كل مرحلة من مراحل الإنتاج</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>الأصالة</h3>
              <p>نحافظ على التقاليد العربية الأصيلة في تحضير القهوة</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💚</div>
              <h3>الاستدامة</h3>
              <p>نهتم بالبيئة ونعمل مع مزارع مستدامة</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>❤️</div>
              <h3>الشغف</h3>
              <p>نحب ما نفعله ونسعى للتميز في كل فنجان</p>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.process}>
          <h2 className={styles.sectionTitle}>رحلة القهوة</h2>
          <div className={styles.processSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>🌱</div>
              <h3>الزراعة</h3>
              <p>نختار أفضل حبوب القهوة من مزارع مختارة بعناية</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>🔥</div>
              <h3>التحميص</h3>
              <p>نحمص الحبوب بدقة للحصول على أفضل نكهة</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>📦</div>
              <h3>التعبئة</h3>
              <p>نعبئ القهوة بعناية للحفاظ على نضارتها</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepIcon}>🚚</div>
              <h3>التوصيل</h3>
              <p>نوصل القهوة طازجة إلى باب منزلك</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.stats}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statLabel}>عميل سعيد</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>نوع قهوة</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>دولة</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>4.9/5</div>
              <div className={styles.statLabel}>تقييم العملاء</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <h2>جاهز لتجربة أفضل قهوة؟</h2>
          <p>انضم إلى عائلة بن تركي واستمتع بقهوة استثنائية</p>
          <a href="/products" className={styles.ctaButton}>
            تصفح المنتجات
          </a>
        </section>
      </div>
    </Layout>
  );
}

