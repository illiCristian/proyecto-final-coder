import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import {
  adminAcces,
  privateAcces,
  rolPremiumAdminAcces,
} from "../middlewares/userMiddleware.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getAllProducts);
//Ruta para obtener todos los productos sin el populate
router.get("/products", productController.getProducts);
router.get("/:id", productController.getProductById);
/* privateAcces,
  rolPremiumAdminAcces, */
router.post("/", productController.createProduct);
router.put("/:id", privateAcces, adminAcces, productController.updateProduct);
router.delete(
  "/:id",
  privateAcces,
  rolPremiumAdminAcces,
  productController.deleteProduct
);

export default router;
