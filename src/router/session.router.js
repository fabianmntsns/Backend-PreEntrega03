import { Router } from "express";
import passport from "passport";
import { failLoginController, failRegisterController, githubController, githubcallbackController, loginController, logoutController, registerController } from "../controllers/session.controller.js";
import UserModel from "../dao/models/user.model.js";
import { generateRandomString } from "../utils.js";
import userPasswordModel from "../dao/models/user-password.model.js";
import { config } from "dotenv";

const router = Router()

// registro
router.post('/register', passport.authenticate('register',{failureRedirect: '/session/failRegister'}), registerController)

router.get('/failRegister', failRegisterController)

//login
router.post('/login',  passport.authenticate('login',{failureRedirect: '/session/failLogin'}), 
loginController)

router.get('/failLogin', failLoginController)


//logout
router.get('/logout', logoutController)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}), githubController)

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), githubcallbackController)

router.get('/forget-password', async (req, res) => {
    const email = req.body.email
    const user = await UserModel.findOne({ email })
        if(!user) {
            return res.status(404).json({ status: 'error', error: 'Usuario no encontrado'})
        }
    const token = generateRandomString(16)
    await userPasswordModel.create({ email, token })
    const mailerConfig = {
        service: 'gmail',
        auth: { user: config.codernodemailer.user , pass: config.codernodemailer.password }
    }
    let transporter = nodemailer.createTransport(mailerConfig)
    let message = {
        from: config.codernodemailer.user,
        to: email,
        subject: '[CODERSHOP] Reset your password',
        html: `You have asked to reset your password. You can do it here:
         <a href="http://localhost:8080/reset-password/${token}">`
    }
    try {
        await transporter.sendMail(message)
        res.json({ status: 'success', message: `Email successfully sent to ${email} in order to reset password` })
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message })
    }
})

router.get('/verify-token/:token', async (req, res) => {
    const userPassword = await UserPasswordModel.findOne({ token: req.params.token })
    if (!userPassword) {
        return res.status(404).json({ status: 'error', error: 'Token no válido / El token ha expirado' })
    }
    const user = userPassword.email
    res.render('sessions/reset-password', { user })
})

router.post('/reset-password/:user', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.params.user })
        await UserModel.findByIdAndUpdate(user._id, { password: createHash(req.body.newPassword) })
        res.json({ status: 'success', message: 'Se ha creado una nueva contraseña' })
        await userPasswordModel.deleteOne({ email: req.params.user })
    } catch(err) {
        res.json({ status: 'error', error: err.message })
    }
})
export default router
