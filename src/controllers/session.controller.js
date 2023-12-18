import UserProfileDTO from "../DTO/sessionDTO.js"
import logger from "../logger.js"


export const registerController = async (req, res) => {
    res.redirect('/session/login')
}

export const failRegisterController = (req, res) =>
    res.send({ error: 'Ocurrió un error' })


export const loginController = async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Datos incorrectos' })
    }
    req.session.user = {
        first_name: req.user?.first_name,
        last_name: req.user?.last_name,
        email: req.user.email,
        age: req.user?.age,
        cart: req.user?.cart,
        role: req.user.role,
    }
    if (req.user.role === "admin") {
        res.redirect('/Realtimeproducts')
    } else {
        res.redirect('/products')
    }
}


export const failLoginController = (req, res) =>
    res.send({ error: 'Ocurrió un error' })

export const logoutController = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).render(err.mesagge)
        } else
            res.redirect('/')
    })
}

export const githubController = (req, res) => { }

export const githubcallbackController = async (req, res) => {
    logger.info('Callback: ', req.user)
    req.session.user = req.user
    res.redirect('/products')
}

//views 

export const registerViewController = async (req, res) => {
    res.render('sessions/register')
}

export const loginViewController = async (req, res) => {
    res.render('sessions/login')
}

export const profileViewController = (req, res) => {

    const userProfileDTO = new UserProfileDTO(req.session.user);
    res.render('sessions/profile', userProfileDTO)

}

export const forgetPasswordViewController = (req, res ) => {
    res.render('sessions/forget-password')
}


export const resetPasswordViewController = (req, res) => {
    res.redirect(`/api/sessions/verify-token/${req.params.token}`)
}
