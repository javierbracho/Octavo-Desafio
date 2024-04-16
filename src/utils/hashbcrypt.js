import bcrypt from "bcrypt"

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const validPassword = (password, user) => bcrypt.compareSync(password, user.password)

export default {createHash, validPassword}