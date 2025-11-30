/**
 * GET /api/products - عرض كل المنتجات مع البحث والفلترة
 * POST /api/products - إضافة منتج جديد (Admin/Staff)
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
 * GET - عرض المنتجات مع البحث والفلترة
 */
async function handleGet(req, res) {
  try {
    const {
      search,
      categoryId,
      isAvailable,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // بناء شروط البحث
    const where = {};

    if (search) {
      where.OR = [
        { nameAr: { contains: search } },
        { nameEn: { contains: search } },
        { descriptionAr: { contains: search } },
        { sku: { contains: search } },
      ];
    }

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    if (isAvailable !== undefined) {
      where.isAvailable = isAvailable === "true";
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    // حساب الصفحات
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // جلب المنتجات
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take,
        orderBy: { [sortBy]: sortOrder },
        include: {
          category: {
            select: {
              id: true,
              nameAr: true,
              nameEn: true,
            },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return res.status(200).json({
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب المنتجات",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

/**
 * POST - إضافة منتج جديد
 * Admin/Staff only
 */
async function handlePost(req, res) {
  try {
    // التحقق من المصادقة والصلاحيات
    const authResult = await authenticateUser(req);
    if (!authResult.success) {
      return res.status(401).json(authResult);
    }

    if (!hasRole(authResult.user, ["ADMIN", "STAFF"])) {
      return res.status(403).json({
        success: false,
        message: "غير مصرح لك بإضافة منتجات",
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

    // التحقق من البيانات المطلوبة
    if (!nameAr || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "الاسم بالعربية والسعر والفئة مطلوبة",
      });
    }

    // التحقق من وجود الفئة
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
    });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "الفئة غير موجودة",
      });
    }

    // معالجة الصورة
    let imageUrl = null;
    if (files.image) {
      imageUrl = getFileUrl(files.image);
    }

    // إنشاء المنتج
    const product = await prisma.product.create({
      data: {
        nameAr,
        nameEn: nameEn || null,
        descriptionAr: descriptionAr || null,
        descriptionEn: descriptionEn || null,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        stock: stock ? parseInt(stock) : 0,
        isAvailable: isAvailable === "true" || isAvailable === true,
        size: size || null,
        weight: weight || null,
        sku: sku || null,
        imageUrl,
      },
      include: {
        category: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "تم إضافة المنتج بنجاح",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    
    // التحقق من خطأ SKU المكرر
    if (error.code === "P2002" && error.meta?.target?.includes("sku")) {
      return res.status(400).json({
        success: false,
        message: "رمز المنتج (SKU) موجود مسبقاً",
      });
    }

    return res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إضافة المنتج",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}

