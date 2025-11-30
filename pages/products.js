import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styles from "../styles/Products.module.css";

export default function Products() {
  const { user } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories?active=true");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        isAvailable: "true",
        ...(selectedCategory && { categoryId: selectedCategory }),
        ...(searchTerm && { search: searchTerm }),
      });

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      setError("فشل في تحميل المنتجات");
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId) => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/cart/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("تمت إضافة المنتج إلى السلة");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء إضافة المنتج");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-center" style={{ minHeight: "400px" }}>
          <div className="loading"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>☕ قائمة منتجاتنا</h1>
          <p>اكتشف أفضل أنواع القهوة العربية الأصيلة</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className={styles.filterSection}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.categories}>
            <button
              className={selectedCategory === "" ? styles.active : ""}
              onClick={() => setSelectedCategory("")}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={selectedCategory === cat.id.toString() ? styles.active : ""}
                onClick={() => setSelectedCategory(cat.id.toString())}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.nameAr} />
                ) : (
                  <div className={styles.noImage}>
                    <span>☕</span>
                  </div>
                )}
                {product.stock < 10 && product.stock > 0 && (
                  <span className={styles.lowStock}>كمية محدودة</span>
                )}
              </div>

              <div className={styles.productInfo}>
                <h3>{product.nameAr}</h3>
                {product.descriptionAr && (
                  <p className={styles.description}>{product.descriptionAr}</p>
                )}

                <div className={styles.productMeta}>
                  {product.size && <span>الحجم: {product.size}</span>}
                  {product.weight && <span>الوزن: {product.weight}</span>}
                </div>

                <div className={styles.productFooter}>
                  <span className={styles.price}>{product.price} ج.م</span>
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => addToCart(product.id)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? "غير متوفر" : "أضف للسلة"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className={styles.emptyState}>
            <p>لا توجد منتجات متاحة حالياً</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

