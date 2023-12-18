import { Router } from "express";
import { privateRoutes, publicRoutes } from "../middlewares/auth.middleware.js";
import { forgetPasswordViewController, loginViewController, profileViewController, registerViewController, resetPasswordViewController } from "../controllers/session.controller.js";

const router = Router()

router.get('/register', privateRoutes, registerViewController)

router.get('/', privateRoutes, loginViewController)

router.get('/profile', publicRoutes, profileViewController)

router.get('/session/register', privateRoutes, registerViewController)

router.get('/session/login', privateRoutes, loginViewController)

router.get('/session/profile', publicRoutes, profileViewController)

router.get('/forget-password', forgetPasswordViewController)

router.get('reset-password/:token', resetPasswordViewController)


export default router