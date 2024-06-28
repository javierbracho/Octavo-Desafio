import passport from "passport";
import local from "passport-local"
import userModel from "../models/user.model.js"
import cartModel from "../models/cart.model.js"
import hashbcrypt from "../utils/hashbcrypt.js"

const { createHash, validPassword } = hashbcrypt;
const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use("user", new localStrategy({
        passReqToCallback: true,
        usernameField: "email",
    }, async (req, username, password, done ) => {
        const {first_name, last_name, email, age} = req.body;
        try {
            const findUser = await userModel.findOne({email: email})
                if (findUser) return done (null, false)

            const newCart = new cartModel()
            await newCart.save()

            const newUser = {
                first_name,
                last_name,
                email,
                age,               
                password: createHash(password),
                cart: newCart._id,
                documents: [],

            }
            const result = await userModel.create(newUser)
            return done (null, result) 
        } catch (error) {
            return done (error)
        }
    }))

    passport.use("login", new localStrategy({
        usernameField: "email",
    }, async (email, password, done) => {
        try {
            const user = await userModel.findOne({email});
                user.last_connection = new Date ()
                await user.save()
            if(!user) {
                console.log("Usuario inexistente")
                return done (null, false)
            }
            if(!validPassword (password, user)) {
                console.log("Contraseña incorrecta")
                return done(null, false)
            }
            return done (null, user)
        } catch (error) {
            return done (error)
        }
    }))
}

passport.serializeUser((user, done)=>{
    done(null,user._id)
}) 

passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById({_id: id})
    done(null, user)
})

export default initializePassport