import { Router } from "express";
import { createProduct, getProducts, deleteProduct } from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.post("/:id", deleteProduct)

export default router;