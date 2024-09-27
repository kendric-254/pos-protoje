'use strict';

const fs = require('fs'); // File system module to read files
const path = require('path'); // Path module to handle file paths
const Sequelize = require('sequelize'); // Sequelize for database interaction
const process = require('process'); // Process module to access environment variables
const basename = path.basename(__filename); // Get the current file name
const env = process.env.NODE_ENV || 'development'; // Set environment (default to development)
const config = require(__dirname + '/../config/config.json')[env]; // Load the database configuration based on the environment
const db = {}; // Object to hold all models

let sequelize;

// Create a new Sequelize instance using environment variable or configuration file
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory (models directory)
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && // Ignore hidden files
      file !== basename && // Exclude the current file
      file.slice(-3) === '.js' && // Only include JavaScript files
      file.indexOf('.test.js') === -1 // Exclude test files
    );
  })
  .forEach(file => {
    // Import each model and add it to the db object
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Use the model name as the key
  });

// Set up associations between models if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add sequelize and Sequelize to the db object for further use
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the db object containing all models and sequelize instance
module.exports = db;
