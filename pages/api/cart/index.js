/**
 * GET /api/cart - عرض سلة المستخدم
 * DELETE /api/cart - تفريغ السلة
 */

import prisma from "../../../lib/prisma";
import { authenticateUser } from "../../../lib/jwt";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/**
 * GET - عرض سلة المستخدم
 */
async function handleGet(req, res) {
  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const userId = authResult.user.id;

    // جلب أو إنشاء السلة
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
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
        },
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
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
          },
        },
      });
    }

    // حساب الإجمالي
    const total = cart.items.reduce((sum, item) => {
      return sum + parseFloat(item.product.price) * item.quantity;
    }, 0);

    return res.status(200).json({
      success: true,
      cart: {
        ...cart,
        total,
        itemsCount: cart.items.length,
        totalQuantity: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب السلة",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

/**
 * DELETE - تفريغ السلة
 */
async function handleDelete(req, res) {
  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const userId = authResult.user.id;

    // حذف كل عناصر السلة
    await prisma.cartItem.deleteMany({
      where: {
        cart: {
          userId,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "تم تفريغ السلة بنجاح",
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تفريغ السلة",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

