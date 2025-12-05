/**
 * GET /api/categories - عرض كل الفئات
 * POST /api/categories - إضافة فئة جديدة (Admin only)
 */

import prisma from "../../../lib/prisma";
import { authenticateUser, hasRole } from "../../../lib/jwt";
import { parseForm, getCloudinaryUrl, deleteFromCloudinary } from "../../../lib/upload";

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
  let uploadedPublicId = null;

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

    // تحليل البيانات والرفع إلى Cloudinary
    const { fields, files, cloudinaryResults } = await parseForm(req, {
      folder: "categories",
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
    });

    const { nameAr, nameEn, descriptionAr, descriptionEn, isActive, order } = fields;

    // التحقق من البيانات المطلوبة
    if (!nameAr) {
      // حذف الصورة المرفوعة إذا كانت موجودة
      if (cloudinaryResults.image?.public_id) {
        await deleteFromCloudinary(cloudinaryResults.image.public_id);
      }

      return res.status(400).json({
        success: false,
        message: "الاسم بالعربية مطلوب",
      });
    }

    // معالجة الصورة من Cloudinary
    let imageUrl = null;
    let imagePublicId = null;

    if (cloudinaryResults.image) {
      uploadedPublicId = cloudinaryResults.image.public_id;
      imageUrl = cloudinaryResults.image.secure_url || 
                 getCloudinaryUrl(cloudinaryResults.image);
      imagePublicId = uploadedPublicId;
    }

    // إنشاء الفئة
    const category = await prisma.category.create({
      data: {
        nameAr,
        nameEn: nameEn || null,
        descriptionAr: descriptionAr || null,
        descriptionEn: descriptionEn || null,
        imageUrl,
        imagePublicId,
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

    // حذف الصورة المرفوعة في حالة حدوث خطأ
    if (uploadedPublicId) {
      try {
        await deleteFromCloudinary(uploadedPublicId);
      } catch (cleanupError) {
        console.error("Error cleaning up uploaded image:", cleanupError);
      }
    }

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة الفئة",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}