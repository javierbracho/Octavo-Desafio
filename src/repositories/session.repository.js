import passport from "passport";
import hashbcrypt from "../utils/hashbcrypt.js"

const autenticarUsuario = passport.authenticate("login", {failureRedirect: "/faillogin"})

export default autenticarUsuario