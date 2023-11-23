import { Router } from "express"
import { addMessageController, getMessagesController } from "../controllers/message.controller.js"
import { publicRoutes } from "../middlewares/auth.middleware.js"

const router = Router()

router.get('/', getMessagesController)

router.post('/', publicRoutes, addMessageController)

export default router