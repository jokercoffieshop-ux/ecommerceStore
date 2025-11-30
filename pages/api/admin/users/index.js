import { verifyToken } from "../../../../lib/jwt";
import prisma from "../../../../lib/prisma";

/**
 * Admin Users API
 * GET /api/admin/users - Get all users (Admin only)
 */
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

    if (req.method === "GET") {
      // Get all users with optional filtering
      const { role, search, page = 1, limit = 10 } = req.query;
      
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);

      // Build where clause
      const where = {};
      
      if (role && role !== "ALL") {
        where.role = role;
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
        ];
      }

      // Get users with pagination
      const [users, total] = await Promise.all([
        prisma.user.findMany({
          where,
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
              },
            },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take,
        }),
        prisma.user.count({ where }),
      ]);

      return res.status(200).json({
        users,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Admin users API error:", error);
    return res.status(500).json({ 
      message: "حدث خطأ في الخادم",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}