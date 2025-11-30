import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Link from "next/link";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (data.success) {
        setCart(data.cart);
      }
    } catch (err) {
      setError("فشل في تحميل السلة");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      const data = await res.json();

      if (data.success) {
        fetchCart();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء تحديث الكمية");
    }
  };

  const removeItem = async (itemId) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      const res = await fetch(`/api/cart/items/${itemId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("تم حذف المنتج من السلة");
        fetchCart();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء حذف المنتج");
    }
  };

  const clearCart = async () => {
    if (!confirm("هل أنت متأكد من تفريغ السلة؟")) return;

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("تم تفريغ السلة");
        fetchCart();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("حدث خطأ أثناء تفريغ السلة");
    }
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

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>🛒 سلة التسوق</h1>
          {cart && cart.items.length > 0 && (
            <button className={styles.clearBtn} onClick={clearCart}>
              تفريغ السلة
            </button>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {cart && cart.items.length > 0 ? (
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              {cart.items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    {item.product.imageUrl ? (
                      <img src={item.product.imageUrl} alt={item.product.nameAr} />
                    ) : (
                      <div className={styles.noImage}>☕</div>
                    )}
                  </div>

                  <div className={styles.itemInfo}>
                    <h3>{item.product.nameAr}</h3>
                    <p className={styles.itemPrice}>{item.product.price} ج.م</p>
                  </div>

                  <div className={styles.itemQuantity}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    <p>{(item.product.price * item.quantity).toFixed(2)} ريال</p>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <h2>ملخص الطلب</h2>

              <div className={styles.summaryRow}>
                <span>عدد المنتجات:</span>
                <span>{cart.itemsCount}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>إجمالي الكمية:</span>
                <span>{cart.totalQuantity}</span>
              </div>

              <div className={styles.summaryTotal}>
                <span>الإجمالي:</span>
                <span>{cart.total.toFixed(2)} ج.م</span>
              </div>

              <Link href="/checkout" className={styles.checkoutBtn}>
                إتمام الطلب
              </Link>

              <Link href="/products" className={styles.continueBtn}>
                متابعة التسوق
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCart}>
            <p>🛒 سلتك فارغة</p>
            <Link href="/products" className={styles.shopBtn}>
              تصفح المنتجات
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}

