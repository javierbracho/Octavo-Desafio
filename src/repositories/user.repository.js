import passport from "passport";
import hashbrypt from "../utils/hashbcrypt.js"

const nuevoUsuario = passport.authenticate("user", {failureRedirect: "/user/failedregister"})

export default nuevoUsuario