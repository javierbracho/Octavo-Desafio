import passport from "passport";
import hashbrypt from "../utils/hashbcrypt.js"

const nuevoUsuario = passport.authenticate("user", {failureRedirect: "/failedregister"})

export default nuevoUsuario