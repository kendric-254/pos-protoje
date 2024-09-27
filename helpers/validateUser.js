const Joi = require('joi');

const userSchema = Joi.object({
    user_email: Joi.string().email().lowercase().required(), // Validate email format
    password: Joi.string().min(8).required(), // Password must be at least 8 characters long
});

module.exports = userSchema;
