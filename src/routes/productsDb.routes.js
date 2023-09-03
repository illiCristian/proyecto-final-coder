import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import {
  adminAcces,
  privateAcces,
  rolPremiumAdminAcces,
} from "../middlewares/userMiddleware.js";
import upload from "../middlewares/multer.js";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getAllProducts);
//Ruta para obtener todos los productos sin el populate
router.get("/products", privateAcces, productController.getProducts);
router.get("/:id", productController.getProductById);
/*  */
router.post("/", rolPremiumAdminAcces, productController.createProduct);
router.put("/:id", privateAcces, adminAcces, productController.updateProduct);
//test
//http://localhost:8080/api/productsDatabase/editimage/6462956ccdb11f7f26a84807
router.put(
  "/editimage/:id",
  adminAcces,
  upload.array("images"),
  productController.updateImage
);
router.delete("/:id", rolPremiumAdminAcces, productController.deleteProduct);

export default router;
