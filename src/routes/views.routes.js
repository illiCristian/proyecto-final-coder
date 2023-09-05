import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import ChatController from "../controllers/chat.controller.js";
import CartController from "../controllers/cart.controller.js";
import {
  publicAcces,
  adminAcces,
  isAuth,
  rolPremiumAdminAcces,
} from "./../middlewares/userMiddleware.js";
import UserController from "../controllers/user.controller.js";
import validateObjectId from "../middlewares/validateObjetId.js";

const router = Router();

/* Controllers */
const productController = new ProductController();
const chatController = new ChatController();
const cartController = new CartController();
const userController = new UserController();

/* Products Db */
//Obtener todos los productos
router.get("/", productController.getAllProducts);
//Obtener un producto por id para poder editarlo
router.get(
  "/productsDb/:id",
  validateObjectId,
  rolPremiumAdminAcces,
  productController.productsDb
);
//Vista creada para los primeros desafios editar productos tiempo real fs
router.get("/realtimeproducts", adminAcces, productController.realTimeProducts);
//Filtrado de productos
router.get("/products", productController.productsFilter);
//Obtener un producto para generar la vista de detalle
router.get(
  "/products/:id",
  validateObjectId,
  productController.getProductToRender
);

/* Chat. */
router.get("/chat", publicAcces, chatController.renderChat);

/* Cart */
router.get("/cart", cartController.getCart);

/* User */
router.get("/register", isAuth, userController.registerView);
router.get("/login", isAuth, userController.loginView);
router.get("/profile", publicAcces, userController.profileView);
router.get("/resetpassword", userController.resetPasswordView);
router.get("/admin", publicAcces, adminAcces, userController.admin);
export default router;
