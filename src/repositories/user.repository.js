import passport from "passport";
import hashbrypt from "../utils/hashbcrypt.js"

const autenticarUsuario = passport.authenticate("user", {failureRedirect: "/failedregister"})

export default autenticarUsuario