import { Router } from "express"
import { addCartController, 
    addProductToCartController, 
    deleteAllProductsController, 
    deleteProductFromCartController, 
    getCartByIdController, 
    updateCartController, 
    updateProductQuantityController,
    purchaseCartController } from "../controllers/cart.controller.js"
import { publicRoutes, isUser } from "../middlewares/auth.middleware.js"

const router = Router()

router.post('/', addCartController)

router.get('/:cid', getCartByIdController)

router.post('/:cid/product/:pid', [publicRoutes, isUser], addProductToCartController)

router.delete('/:cid/products/:pid',publicRoutes, deleteProductFromCartController)

router.put('/:cid', publicRoutes, updateCartController)

router.put('/:cid/products/:pid', updateProductQuantityController)

router.delete('/:cid', deleteAllProductsController)

router.post('/:cid/purchase', purchaseCartController)

export default router