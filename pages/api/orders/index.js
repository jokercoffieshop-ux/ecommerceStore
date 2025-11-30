/**
 * GET /api/orders - عرض كل الطلبات (Admin/Staff) أو طلبات المستخدم (Client)
 * POST /api/orders - إنشاء طلب جديد من السلة
 */

import prisma from "../../../lib/prisma";
import { authenticateUser, hasRole } from "../../../lib/jwt";
import { validate, createOrderSchema } from "../../../lib/validation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/**
 * GET - عرض الطلبات
 * Admin/Staff: كل الطلبات
 * Client: طلباته فقط
 */
async function handleGet(req, res) {
  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const user = authResult.user;
    const {
      status,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // بناء شروط البحث
    const where = {};

    // إذا كان عميل، عرض طلباته فقط
    if (!hasRole(user, ["ADMIN", "STAFF"])) {
      where.userId = user.id;
    }

    if (status) {
      where.status = status;
    }

    // حساب الصفحات
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // جلب الطلبات
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
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
      }),
      prisma.order.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الطلبات",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

/**
 * POST - إنشاء طلب جديد من السلة
 */
async function handlePost(req, res) {
  try {
    // التحقق من المصادقة
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    const userId = authResult.user.id;

    // التحقق من صحة البيانات
    const validation = validate(createOrderSchema, req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "بيانات الطلب غير صحيحة",
        errors: validation.errors,
      });
    }

    const {
      customerName,
      customerPhone,
      customerEmail,
      address,
      city,
      notes,
      paymentMethod = "CASH",
    } = validation.data;

    // جلب السلة مع العناصر
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "السلة فارغة",
      });
    }

    // التحقق من توفر المنتجات والمخزون
    for (const item of cart.items) {
      if (!item.product.isAvailable) {
        return res.status(400).json({
          success: false,
          message: `المنتج "${item.product.nameAr}" غير متوفر حالياً`,
        });
      }

      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `الكمية المتوفرة من "${item.product.nameAr}": ${item.product.stock}`,
        });
      }
    }

    // حساب الإجمالي
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + parseFloat(item.product.price) * item.quantity;
    }, 0);

    // توليد رقم الطلب
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // إنشاء الطلب مع العناصر في معاملة واحدة
    const order = await prisma.$transaction(async (tx) => {
      // إنشاء الطلب
      const newOrder = await tx.order.create({
        data: {
          userId,
          orderNumber,
          status: "PENDING",
          paymentMethod,
          totalAmount,
          customerName,
          customerPhone,
          customerEmail: customerEmail || authResult.user.email,
          address,
          city: city || null,
          notes: notes || null,
        },
      });

      // إنشاء عناصر الطلب
      const orderItems = await Promise.all(
        cart.items.map((item) =>
          tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
              nameAr: item.product.nameAr,
            },
          })
        )
      );

      // تحديث المخزون
      await Promise.all(
        cart.items.map((item) =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          })
        )
      );

      // تفريغ السلة
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return { ...newOrder, items: orderItems };
    });

    return res.status(201).json({
      success: true,
      message: "تم إنشاء الطلب بنجاح",
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إنشاء الطلب",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

