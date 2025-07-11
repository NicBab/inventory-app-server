import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const products = await prisma.products.findMany({
      where: search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { sku: { contains: search, mode: "insensitive" } },
              { mfr: { contains: search, mode: "insensitive" } },
            ],
          }
        : undefined, // return all if no search
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving products" });
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, name, mfr, sku, price, rating, stockQuantity } =
      req.body;
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        mfr,
        sku,
        price,
        rating,
        stockQuantity,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.products.delete({
      where: { productId: id },
    });
    res.status(200).json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};
