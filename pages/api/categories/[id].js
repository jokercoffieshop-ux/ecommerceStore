/**
 * GET /api/categories/[id] - عرض فئة واحدة
 * PUT /api/categories/[id] - تعديل فئة (Admin only)
 * DELETE /api/categories/[id] - حذف فئة (Admin only)
 */

import prisma from "../../../lib/prisma";
import { authenticateUser, hasRole } from "../../../lib/jwt";
import { parseForm, getFileUrl, deleteFile } from "../../../lib/upload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    return handleGet(req, res, id);
  } else if (req.method === "PUT") {
    return handlePut(req, res, id);
  } else if (req.method === "DELETE") {
    return handleDelete(req, res, id);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

/**
 * GET - عرض فئة واحدة
 */
async function handleGet(req, res, id) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: {
          where: { isAvailable: true },
          take: 10,
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "الفئة غير موجودة",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الفئة",
    });
  }
}

/**
 * PUT - تعديل فئة
 * Admin only
 */
async function handlePut(req, res, id) {
  try {
    // التحقق من المصادقة والصلاحيات
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    if (!hasRole(authResult.user, ["ADMIN"])) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بتعديل الفئات",
      });
    }

    // التحقق من وجود الفئة
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "الفئة غير موجودة",
      });
    }

    // تحليل البيانات
    const { fields, files } = await parseForm(req);
    const { nameAr, nameEn, descriptionAr, descriptionEn, isActive, order } = fields;

    // معالجة الصورة الجديدة
    let imageUrl = existingCategory.imageUrl;
    if (files.image) {
      // حذف الصورة القديمة
      if (existingCategory.imageUrl) {
        deleteFile(existingCategory.imageUrl);
      }
      imageUrl = getFileUrl(files.image);
    }

    // تحديث الفئة
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        nameAr: nameAr || existingCategory.nameAr,
        nameEn: nameEn !== undefined ? nameEn : existingCategory.nameEn,
        descriptionAr: descriptionAr !== undefined ? descriptionAr : existingCategory.descriptionAr,
        descriptionEn: descriptionEn !== undefined ? descriptionEn : existingCategory.descriptionEn,
        imageUrl,
        isActive: isActive !== undefined ? (isActive === "true" || isActive === true) : existingCategory.isActive,
        order: order !== undefined ? parseInt(order) : existingCategory.order,
      },
    });

    return res.status(200).json({
      success: true,
      message: "تم تعديل الفئة بنجاح",
      category,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تعديل الفئة",
    });
  }
}

/**
 * DELETE - حذف فئة
 * Admin only - مع حماية إذا كانت الفئة تحتوي على منتجات
 */
async function handleDelete(req, res, id) {
  try {
    // التحقق من المصادقة والصلاحيات
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    if (!hasRole(authResult.user, ["ADMIN"])) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بحذف الفئات",
      });
    }

    // التحقق من وجود الفئة
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "الفئة غير موجودة",
      });
    }

    // التحقق من عدم وجود منتجات في الفئة
    if (category._count.products > 0) {
      return res.status(400).json({
        success: false,
        message: `لا يمكن حذف الفئة لأنها تحتوي على ${category._count.products} منتج`,
      });
    }

    // حذف الصورة
    if (category.imageUrl) {
      deleteFile(category.imageUrl);
    }

    // حذف الفئة
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      success: true,
      message: "تم حذف الفئة بنجاح",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف الفئة",
    });
  }
}

