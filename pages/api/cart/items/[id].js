/**
 * PUT /api/cart/items/[id] - تعديل كمية منتج في السلة
 * DELETE /api/cart/items/[id] - حذف منتج من السلة
 */

import prisma from "../../../../lib/prisma";
import { authenticateUser } from "../../../../lib/jwt";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    return handlePut(req, res, id);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res, id);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/**
 * PUT - تعديل كمية منتج في السلة
 */
async function handlePut(req, res, id) {
  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const userId = authResult.user.id;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "الكمية يجب أن تكون رقماً موجباً",
      });
    }

    const qty = parseInt(quantity);

    // التحقق من وجود العنصر في سلة المستخدم
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(id) },
      include: {
        cart: true,
        product: true,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "العنصر غير موجود في السلة",
      });
    }

    if (cartItem.cart.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بتعديل هذا العنصر",
      });
    }

    // التحقق من المخزون
    if (cartItem.product.stock < qty) {
      return res.status(400).json({
        success: false,
        message: `الكمية المتوفرة في المخزون: ${cartItem.product.stock}`,
      });
    }

    // تحديث الكمية
    const updatedItem = await prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity: qty },
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

    return res.status(200).json({
      success: true,
      message: "تم تحديث الكمية بنجاح",
      cartItem: updatedItem,
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث الكمية",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

/**
 * DELETE - حذف منتج من السلة
 */
async function handleDelete(req, res, id) {
  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const userId = authResult.user.id;

    // التحقق من وجود العنصر في سلة المستخدم
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(id) },
      include: {
        cart: true,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "العنصر غير موجود في السلة",
      });
    }

    if (cartItem.cart.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بحذف هذا العنصر",
      });
    }

    // حذف العنصر
    await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      success: true,
      message: "تم حذف المنتج من السلة بنجاح",
    });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف المنتج من السلة",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

