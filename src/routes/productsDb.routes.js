import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import {
  adminAcces,
  privateAcces,
  rolPremiumAdminAcces,
} from "../middlewares/userMiddleware.js";
import upload from "../middlewares/multer.js";
import validateObjectId from "../middlewares/validateObjetId.js";

const router = Router();

const productController = new ProductController();

//Ruta para obtener todos los productos sin el populate
router.get("/products", privateAcces, productController.getProducts);

router.post("/", rolPremiumAdminAcces, productController.createProduct);

router.put("/uploadmany", productController.uploadMany);

router.get("/:id", productController.getProductById);
router.put(
  "/:id",
  validateObjectId,
  rolPremiumAdminAcces,
  productController.updateProduct
);
//test
//http://localhost:8080/api/productsDatabase/editimage/6462956ccdb11f7f26a84807
router.put(
  "/editimage/:id",
  validateObjectId,
  rolPremiumAdminAcces,
  upload.array("images"),
  productController.updateImage
);

router.delete(
  "/:id",
  validateObjectId,
  rolPremiumAdminAcces,
  productController.deleteProduct
);

export default router;
