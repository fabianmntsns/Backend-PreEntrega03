import passport from "passport";
import GithubStrategy from "passport-github2";
import local from "passport-local";
import { createHash, isValidPassword } from "../utils.js";
import config from "./config.js";
import { cartService } from "../services/CartService.js";
import { userService } from "../services/UserService.js";

const localStrategy = local.Strategy

const initializePassport = () => {

    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body
        try {
            const user = await userService.get({email: username})
            if (user) {
                return done(null, false)
            }
            const cartForNewUser = await cartService.create()
            const newUser = {
                first_name, last_name, email, age, password: createHash(password), cart: cartForNewUser._id, role: 'user',
            };

            const result = await userService.create(newUser)
            return done(null, result)

        } catch (err) {
            return done(err)
        }

    }))

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            if (username === config.admin.email && password === config.admin.password) {
                const user = {
                    "_id": config.admin._id,
                    "email": config.admin.email,
                    "role": "admin",
                    "cart": "admincart000000000000001"
                }
                return done(null, user)
            }

            const user = await userService.get({email: username})
            if (!user) {
                return done(null, false)
            }
            if (!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
        } catch (err) {

        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: config.github.client_id,
        clientSecret: config.github.client_secret,
        callbackURL: config.github.callback_url,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userService.get({email: profile._json.email})
            if (user) return done(null, user)
            const newUser = {
                first_name: profile._json.name,
                last_name: '',
                email: profile._json.email,
                password: ''
            }
            const result = await userService.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error al loguearte con GitHub')
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        if (id === config.admin._id) {
            const user = {
                "_id": config.admin._id,
                "email": config.admin.email,
                "role": "admin",
                "cart": "admincart000000000000001"
            }
            return done(null, user)
        }

        const user = await userService.get({id})
        done(null, user)
    })
}

export default initializePassport