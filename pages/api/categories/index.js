/**
 * GET /api/categories - عرض كل الفئات
 * POST /api/categories - إضافة فئة جديدة (Admin only)
 */

import prisma from "../../../lib/prisma";
import { authenticateUser, hasRole } from "../../../lib/jwt";
import { parseForm, getFileUrl } from "../../../lib/upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/**
 * GET - عرض كل الفئات
 * يمكن للجميع الوصول
 */
async function handleGet(req, res) {
  try {
    const { active } = req.query;

    const where = {};
    if (active === "true") {
      where.isActive = true;
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الفئات",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

/**
 * POST - إضافة فئة جديدة
 * Admin only
 */
async function handlePost(req, res) {
  try {
    // التحقق من المصادقة والصلاحيات
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    if (!hasRole(authResult.user, ["ADMIN"])) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بإضافة فئات",
      });
    }

    // تحليل البيانات
    const { fields, files } = await parseForm(req);

    const { nameAr, nameEn, descriptionAr, descriptionEn, isActive, order } = fields;

    // التحقق من البيانات المطلوبة
    if (!nameAr) {
      return res.status(400).json({
        success: false,
        message: "الاسم بالعربية مطلوب",
      });
    }

    // معالجة الصورة
    let imageUrl = null;
    if (files.image) {
      imageUrl = getFileUrl(files.image);
    }

    // إنشاء الفئة
    const category = await prisma.category.create({
      data: {
        nameAr,
        nameEn: nameEn || null,
        descriptionAr: descriptionAr || null,
        descriptionEn: descriptionEn || null,
        imageUrl,
        isActive: isActive === "true" || isActive === true,
        order: order ? parseInt(order) : 0,
      },
    });

    return res.status(201).json({
      success: true,
      message: "تم إضافة الفئة بنجاح",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة الفئة",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

