// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'songs.db', // This will create a songs.db file
  logging: false // Disable logging for cleaner output
});

module.exports = sequelize;