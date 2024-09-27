const db = require('../model/dbConnect');
const users = db.users;
const { signAccessToken, signRefreshToken } = require("../helpers/jwtHelpers");
const createHttpError = require("http-errors");
const userSchema = require("../helpers/validateUser");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;

module.exports = {
    addUser: async (req, res, next) => {
        try {
            const { user_email, password } = await userSchema.validateAsync(req.body);

            const exists = await users.findOne({ where: { user_email } });
            if (exists) {
                throw createHttpError.Conflict(`${user_email} has already been registered`);
            }

            const newUser = new users({ user_email, password });
            const savedUser = await newUser.save();

            const accessToken = await signAccessToken(savedUser.user_id);

            res.send({ accessToken });
        } catch (error) {
            console.log(error);

            if (error.isJoi === true) error.status = 422;
            next(error);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const result = await userSchema.validateAsync(req.body);
            const user = await users.findOne({ where: { user_email: result.user_email } });

            if (!user) throw createHttpError.NotFound('User not found');

            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) throw createHttpError.Unauthorized('Invalid password');

            const accessToken = await signAccessToken(user.user_id);
            const refreshToken = await signRefreshToken(user.user_id);

            res.send({ accessToken, refreshToken });
        } catch (error) {
            if (error.isJoi === true)
                return next(createHttpError.BadRequest('Invalid Credentials'));
            next(error);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { newPassword, confirmPassword } = req.body;
            const { token } = req.params;

            if (newPassword !== confirmPassword) {
                throw createHttpError.BadRequest('Passwords do not match');
            }

            const decoded = jwt.verify(token, JWT_SECRET);

            const user = await users.findOne({ where: { user_id: decoded.userId } });
            if (!user) throw createHttpError.NotFound('User not found');

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            await user.save();

            res.send('Password reset successfully');
        } catch (error) {
            next(error);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await users.findOne({ where: { user_email: email } });
            if (!user) throw createHttpError.NotFound('User not found');

            const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

            // Here you can add code to send the reset link email to the user

            res.send('Password reset link sent to your email');
        } catch (error) {
            next(error);
        }
    }
};
