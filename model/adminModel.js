const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('admins', {
        admin_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admin_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Hash the password before creating a new admin
    Admin.beforeCreate(async (admin) => {
        try {
            const salt = await bcrypt.genSalt(16);
            const hashedPwd = await bcrypt.hash(admin.password, salt);
            admin.password = hashedPwd; // Set the hashed password
        } catch (error) {
            console.error('Error encrypting Password:', error);
            throw new Error('Error encrypting Password');
        }
    });

    // Method to validate the password
    Admin.prototype.isValidPassword = async function(password) {
        try {
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            console.error('Error validating password:', error);
            throw new Error('Error validating password');
        }
    };

    return Admin;
};
