import { Router } from "express";
import ProductController from "../controllers/products.controller.js";
import ChatController from "../controllers/chat.controller.js";
import CartController from "../controllers/cart.controller.js";
import {
  publicAcces,
  adminAcces,
  isAuth,
} from "./../middlewares/userMiddleware.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

/* Controllers */
const productController = new ProductController();
const chatController = new ChatController();
const cartController = new CartController();
const userController = new UserController();

/* Products Db */
router.get("/", productController.getAllProducts);
router.get("/productsDb", productController.productsDb);
router.get("/realtimeproducts", productController.realTimeProducts);
router.get("/products", productController.productsFilter);
router.get("/products/:id", productController.getProductToRender);

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
