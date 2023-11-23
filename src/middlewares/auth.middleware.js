//import config from "../config/config.js"

export const privateRoutes = (req, res, next) => {
    if (req.session.user) return res.redirect('/profile')
    next()
}

export const publicRoutes = (req, res, next) => {
    if (!req.session.user) return res.redirect('/')
    next()
}

// midleware con el cual quería que se validara el mail y contraseña, error hasta el momento:
// password undefined.

  /*export const isAdminMiddleware = (req, res, next) => {
    const { email, password } = req.session.user;
  
    console.log("Credenciales en la solicitud:", email, password);
    console.log("Credenciales hardcodeadas:", config.admin.email, config.admin.password);
  
    const isAdminUser = email === config.admin.email && password === config.admin.password;
  
    if (isAdminUser) {
        next();
    } else {
        return res.redirect("/products")
    }
  };
   */

  // midleware con el cual solo puede agregar y eliminar productos el usuario con role admin

  export const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      return res.redirect("/products");
    }
  };


  export const isUser = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'user') {
      next();
    } else {
      return res.status(404).json({ error: "Acción no permitida." })
    }
  };


  