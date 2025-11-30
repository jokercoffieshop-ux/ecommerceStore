/**
 * PATCH /api/orders/[id]/status - تحديث حالة الطلب
 * Admin/Staff only
 */

import prisma from "../../../../lib/prisma";
import { authenticateUser, hasRole } from "../../../../lib/jwt";

const VALID_STATUSES = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

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
        message: "غير مصرح لك بتحديث حالة الطلبات",
      });
    }

    const { status } = req.body;

    // التحقق من الحالة
    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `الحالة يجب أن تكون واحدة من: ${VALID_STATUSES.join(", ")}`,
      });
    }

    // التحقق من وجود الطلب
    const existingOrder = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "الطلب غير موجود",
      });
    }

    // إذا تم إلغاء الطلب، إرجاع المنتجات للمخزون
    if (status === "CANCELLED" && existingOrder.status !== "CANCELLED") {
      await prisma.$transaction(
        existingOrder.items.map((item) =>
          prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          })
        )
      );
    }

    // إذا تم استرجاع الطلب، إرجاع المنتجات للمخزون
    if (status === "REFUNDED" && existingOrder.status !== "REFUNDED" && existingOrder.status !== "CANCELLED") {
      await prisma.$transaction(
        existingOrder.items.map((item) =>
          prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          })
        )
      );
    }

    // تحديث حالة الطلب
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                nameAr: true,
                nameEn: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "تم تحديث حالة الطلب بنجاح",
      order,
      previousStatus: existingOrder.status,
      newStatus: status,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث حالة الطلب",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

