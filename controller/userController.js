const db = require('../model/dbConnect')
const users = db.users
const { signAccessToken, signRefreshToken } = require("../helpers/jwtHelpers");
const createHttpError = require("http-errors");
const userSchema = require("../helpers/validateUser");

module.exports = {
    addUser: async (req, res, next) => {
        try {
            const { user_email, password } = await 
            userSchema.validateAsync(req.body);
            
            const exists = await users.findOne({
                where: { user_email }
            })
            if (exists) {
                throw createHttpError.Conflict(`${user_email}has already been registered`)
            }
            
            const newUser = new users({ user_email, password })
            const savedUser = await newUser.save()

            const accessToken = await signAccessToken(savedUser.user_id)

            res.send({accessToken})
        } catch (error) {
            console.log(error)
            
            if (error.isJoi === true) error.status = 422
            next(error)
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const result = await userSchema.validateAsync(req.body);
            const user = await users.findOne({
                where: {
                    user_email: result.user_email
                }
            })
            if (!user) throw createHttpError.NotFound('User not found');

            // password match
            const isMatch = await user.isValidPassword(result.password)
            if (!isMatch) throw createHttpError.Unauthorized('Invalid password');

            // if password matches,then generate token

            const accessToken = await signAccessToken(user.user_id);
            const refreshToken = await signRefreshToken(user.user_id);

            res.send({ accessToken, refreshToken })
        } catch (error) {
            if (error.isJoi === true)
                return next(createHttpError.BadRequest('Invalid Credentials'));
            next(error)
        }
    }
}