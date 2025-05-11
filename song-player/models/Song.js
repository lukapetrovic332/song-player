const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  coverArt: {
    type: DataTypes.STRING,
    defaultValue: ''
  }
});

module.exports = Song;