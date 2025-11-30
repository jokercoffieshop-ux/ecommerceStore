/**
 * PATCH /api/products/[id]/stock - تحديث المخزون
 * Admin/Staff only
 */

import prisma from "../../../../lib/prisma";
import { authenticateUser, hasRole } from "../../../../lib/jwt";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    // التحقق من المصادقة والصلاحيات
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    if (!hasRole(authResult.user, ["ADMIN", "STAFF"])) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بتحديث المخزون",
      });
    }

    const { stock, operation = "set" } = req.body;

    if (stock === undefined || stock === null) {
      return res.status(400).json({
        success: false,
        message: "الكمية مطلوبة",
      });
    }

    const stockValue = parseInt(stock);

    if (isNaN(stockValue) || stockValue < 0) {
      return res.status(400).json({
        success: false,
        message: "الكمية يجب أن تكون رقماً موجباً",
      });
    }

    // التحقق من وجود المنتج
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "المنتج غير موجود",
      });
    }

    let newStock;

    // تحديد العملية
    switch (operation) {
      case "add":
        newStock = existingProduct.stock + stockValue;
        break;
      case "subtract":
        newStock = Math.max(0, existingProduct.stock - stockValue);
        break;
      case "set":
      default:
        newStock = stockValue;
        break;
    }

    // تحديث المخزون
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        stock: newStock,
        // تحديث حالة التوفر تلقائياً
        isAvailable: newStock > 0,
      },
      include: {
        category: {
          select: {
            id: true,
            nameAr: true,
            nameEn: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "تم تحديث المخزون بنجاح",
      product,
      previousStock: existingProduct.stock,
      newStock,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث المخزون",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

