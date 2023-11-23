import { Router } from "express";
import { getProductByIdViewController, productsViewController, realTimeProductsViewController } from "../controllers/product.controller.js";
import { getCartByIdViewController } from "../controllers/cart.controller.js";
import { chatViewController } from "../controllers/chat.controller.js";
import { isAdmin, publicRoutes, isUser } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/products", publicRoutes, productsViewController)

router.get("/realTimeProducts", isAdmin, realTimeProductsViewController)

router.get("/chat", publicRoutes, chatViewController)

router.get('/carts/:cid', [publicRoutes, isUser], getCartByIdViewController)

router.get('/products/:pid', publicRoutes, getProductByIdViewController)

export default router 