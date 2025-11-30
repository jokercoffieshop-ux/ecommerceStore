import { verifyToken } from "../../../../lib/jwt";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

/**
 * Admin User Management API
 * GET /api/admin/users/[id] - Get user by ID (Admin only)
 * PUT /api/admin/users/[id] - Update user (Admin only)
 * DELETE /api/admin/users/[id] - Delete user (Admin only)
 */

const updateUserSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل").optional(),
  email: z.string().email("صيغة البريد الإلكتروني غير صحيحة").optional(),
  phone: z.string().regex(/^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/, "رقم الهاتف غير صحيح").optional(),
  role: z.enum(["CLIENT", "ADMIN", "STAFF"], { errorMap: () => ({ message: "الدور غير صحيح" }) }).optional(),
  isVerified: z.boolean().optional(),
  password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").optional(),
});

export default async function handler(req, res) {
  try {
    // Verify authentication
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "غير مصرح - يجب تسجيل الدخول" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "غير مصرح - توكن غير صالح" });
    }

    // Verify admin role - using id from token (not userId)
    if (!decoded.id) {
      return res.status(401).json({ message: "غير مصرح - بيانات التوكن غير صالحة" });
    }

    const admin = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!admin) {
      return res.status(401).json({ message: "غير مصرح - المستخدم غير موجود" });
    }

    if (admin.role !== "ADMIN") {
      return res.status(403).json({ message: "غير مصرح - هذه الصفحة للإدارة فقط" });
    }

    const { id } = req.query;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "معرف المستخدم غير صحيح" });
    }

    // GET - Get user by ID
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              orders: true,
              otps: true,
            },
          },
          orders: {
            select: {
              id: true,
              orderNumber: true,
              status: true,
              totalAmount: true,
              createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
      }

      return res.status(200).json({ user });
    }

    // PUT - Update user
    if (req.method === "PUT") {
      // Prevent admin from modifying their own account
      if (userId === decoded.id) {
        return res.status(403).json({ message: "لا يمكنك تعديل حسابك الخاص من هذه الصفحة" });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
      }

      // Validate request body
      const validation = updateUserSchema.safeParse(req.body);
      if (!validation.success) {
        const errors = {};
        validation.error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        return res.status(400).json({ message: "بيانات غير صحيحة", errors });
      }

      const updateData = { ...validation.data };

      // If email is being updated, check if it's already in use
      if (updateData.email && updateData.email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
          where: { email: updateData.email },
        });
        if (emailExists) {
          return res.status(400).json({ message: "البريد الإلكتروني مستخدم بالفعل" });
        }
      }

      // Hash password if provided
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      // Update user
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          isVerified: true,
          avatarUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(200).json({
        message: "تم تحديث بيانات المستخدم بنجاح",
        user: updatedUser,
      });
    }

    // DELETE - Delete user
    if (req.method === "DELETE") {
      // Prevent admin from deleting their own account
      if (userId === decoded.id) {
        return res.status(403).json({ message: "لا يمكنك حذف حسابك الخاص" });
      }

      // Check if user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          _count: {
            select: {
              orders: true,
            },
          },
        },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
      }

      // Warning if user has orders
      if (existingUser._count.orders > 0) {
        // Check if force delete is requested
        const { force } = req.query;
        if (!force || force !== "true") {
          return res.status(400).json({
            message: `المستخدم لديه ${existingUser._count.orders} طلب. هل تريد حذف الحساب رغم ذلك؟`,
            hasOrders: true,
            ordersCount: existingUser._count.orders,
          });
        }
      }

      // Delete user (cascade will handle related data)
      await prisma.user.delete({
        where: { id: userId },
      });

      return res.status(200).json({
        message: "تم حذف المستخدم بنجاح",
        userId,
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Admin user management API error:", error);
    return res.status(500).json({
      message: "حدث خطأ في الخادم",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}