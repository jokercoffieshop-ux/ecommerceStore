/**
 * GET /api/orders/[id] - عرض تفاصيل طلب
 */

import prisma from "../../../lib/prisma";
import { authenticateUser, hasRole } from "../../../lib/jwt";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const user = authResult.user;

    // جلب الطلب
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
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
                categoryId: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "الطلب غير موجود",
      });
    }

    // التحقق من الصلاحيات
    // العميل يمكنه رؤية طلباته فقط
    if (!hasRole(user, ["ADMIN", "STAFF"]) && order.userId !== user.id) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بعرض هذا الطلب",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الطلب",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

