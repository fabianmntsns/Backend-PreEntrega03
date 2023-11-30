import { Router } from "express"
import { addProductController,
     deleteProductController, 
     getProductByIdController, 
     getProductsController, 
     updateProductController } from "../controllers/product.controller.js"
import { isAdmin } from "../middlewares/auth.middleware.js"

const router = Router()

router.get('/', getProductsController)

router.get('/:pid', getProductByIdController)

router.post('/', /*isAdmin,*/ addProductController) // middleware comentado para poder crear un product en Tunder

router.put('/:pid', isAdmin, updateProductController)

router.delete('/:pid', isAdmin, deleteProductController)

export default router
