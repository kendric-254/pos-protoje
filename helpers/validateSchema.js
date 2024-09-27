const Joi = require('joi');

// Validation schema for user authentication
const authSchema = Joi.object({
    user_email: Joi.string().email().lowercase().required(), // Changed from admin_email to user_email for general use
    password: Joi.string().min(8).required(), // Password must be at least 8 characters long
});

module.exports = authSchema;
