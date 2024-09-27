const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');

module.exports = {
    // Function to sign an access token
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = { userId }; // Use a general term instead of AdminId
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '600', // Token expires in 600 seconds (10 minutes)
                issuer: 'http://localhost:3000/', // Replace with your domain if needed
                audience: userId.toString(), // Use the user ID as the audience
            };
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createHttpError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    // Middleware to verify access token
    verifyAccessToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return next(createHttpError.Unauthorized());

        const bearerToken = authHeader.split(' ');
        if (bearerToken.length !== 2 || bearerToken[0] !== 'Bearer') {
            return next(createHttpError.Unauthorized());
        }

        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => { 
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    return next(createHttpError.Unauthorized());
                } else {
                    return next(createHttpError.Unauthorized(err.message));
                }
            }
            req.payload = payload;
            next();
        });
    },

    // Function to sign a refresh token
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '1y', // Token expires in 1 year
                issuer: "http://localhost:3000/", // Replace with your domain if needed
                audience: userId.toString(),
            };
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createHttpError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    // Function to verify the refresh token
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(createHttpError.Unauthorized());
                const userId = payload.aud;
                resolve(userId.toString());
            });
        });
    },
};
