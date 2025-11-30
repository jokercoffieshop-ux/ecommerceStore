/**
 * POST /api/cart/items - إضافة منتج للسلة
 */

import prisma from "../../../lib/prisma";
import { authenticateUser } from "../../../lib/jwt";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const userId = authResult.user.id;
    const { productId, quantity = 1 } = req.body;

    // التحقق من البيانات
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "معرف المنتج مطلوب",
      });
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "الكمية يجب أن تكون رقماً موجباً",
      });
    }

    // التحقق من وجود المنتج وتوفره
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "المنتج غير موجود",
      });
    }

    if (!product.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "المنتج غير متوفر حالياً",
      });
    }

    if (product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: `الكمية المتوفرة في المخزون: ${product.stock}`,
      });
    }

    // جلب أو إنشاء السلة
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    // التحقق من وجود المنتج في السلة
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: parseInt(productId),
        },
      },
    });

    let cartItem;

    if (existingItem) {
      // تحديث الكمية
      const newQuantity = existingItem.quantity + qty;

      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `الكمية المتوفرة في المخزون: ${product.stock}`,
        });
      }

      cartItem = await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: parseInt(productId),
          },
        },
        data: {
          quantity: newQuantity,
        },
        include: {
          product: {
            include: {
              category: {
                select: {
                  id: true,
                  nameAr: true,
                  nameEn: true,
                },
              },
            },
          },
        },
      });
    } else {
      // إضافة منتج جديد
      cartItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: parseInt(productId),
          quantity: qty,
        },
        include: {
          product: {
            include: {
              category: {
                select: {
                  id: true,
                  nameAr: true,
                  nameEn: true,
                },
              },
            },
          },
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: existingItem ? "تم تحديث الكمية بنجاح" : "تم إضافة المنتج للسلة بنجاح",
      cartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة المنتج للسلة",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

