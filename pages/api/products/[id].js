/**
 * GET /api/products/[id] - عرض منتج واحد
 * PUT /api/products/[id] - تعديل منتج (Admin/Staff)
 * DELETE /api/products/[id] - حذف منتج (Admin/Staff)
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
 * GET - عرض منتج واحد
 */
async function handleGet(req, res, id) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: {
          select: {
            id: true,
            nameAr: true,
            nameEn: true,
            imageUrl: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "المنتج غير موجود",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب المنتج",
    });
  }
}

/**
 * PUT - تعديل منتج
 * Admin/Staff only
 */
async function handlePut(req, res, id) {
  try {
    // التحقق من المصادقة والصلاحيات
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    if (!hasRole(authResult.user, ["ADMIN", "STAFF"])) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بتعديل المنتجات",
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

    // تحليل البيانات
    const { fields, files } = await parseForm(req);
    const {
      nameAr,
      nameEn,
      descriptionAr,
      descriptionEn,
      price,
      categoryId,
      stock,
      isAvailable,
      size,
      weight,
      sku,
    } = fields;

    // التحقق من الفئة إذا تم تغييرها
    if (categoryId && parseInt(categoryId) !== existingProduct.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId) },
      });

      if (!category) {
        return res.status(400).json({
          success: false,
          message: "الفئة غير موجودة",
        });
      }
    }

    // معالجة الصورة الجديدة
    let imageUrl = existingProduct.imageUrl;
    if (files.image) {
      // حذف الصورة القديمة
      if (existingProduct.imageUrl) {
        deleteFile(existingProduct.imageUrl);
      }
      imageUrl = getFileUrl(files.image);
    }

    // تحديث المنتج
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        nameAr: nameAr || existingProduct.nameAr,
        nameEn: nameEn !== undefined ? nameEn : existingProduct.nameEn,
        descriptionAr: descriptionAr !== undefined ? descriptionAr : existingProduct.descriptionAr,
        descriptionEn: descriptionEn !== undefined ? descriptionEn : existingProduct.descriptionEn,
        price: price ? parseFloat(price) : existingProduct.price,
        categoryId: categoryId ? parseInt(categoryId) : existingProduct.categoryId,
        stock: stock !== undefined ? parseInt(stock) : existingProduct.stock,
        isAvailable: isAvailable !== undefined ? (isAvailable === "true" || isAvailable === true) : existingProduct.isAvailable,
        size: size !== undefined ? size : existingProduct.size,
        weight: weight !== undefined ? weight : existingProduct.weight,
        sku: sku !== undefined ? sku : existingProduct.sku,
        imageUrl,
      },
      include: {
        category: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "تم تعديل المنتج بنجاح",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);

    // التحقق من خطأ SKU المكرر
    if (error.code === "P2002" && error.meta?.target?.includes("sku")) {
      return res.status(400).json({
        success: false,
        message: "رمز المنتج (SKU) موجود مسبقاً",
      });
    }

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تعديل المنتج",
    });
  }
}

/**
 * DELETE - حذف منتج
 * Admin/Staff only
 */
async function handleDelete(req, res, id) {
  try {
    // التحقق من المصادقة والصلاحيات
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    if (!hasRole(authResult.user, ["ADMIN", "STAFF"])) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بحذف المنتجات",
      });
    }

    // التحقق من وجود المنتج
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "المنتج غير موجود",
      });
    }

    // حذف الصورة
    if (product.imageUrl) {
      deleteFile(product.imageUrl);
    }

    // حذف المنتج
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({
      success: true,
      message: "تم حذف المنتج بنجاح",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء حذف المنتج",
    });
  }
}

