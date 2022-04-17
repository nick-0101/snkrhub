const db = require('../clients/postgres');
const { DataTypes } = require('sequelize');

const Inventory = db.define(
  'post',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a post title',
        },
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a post body',
        },
      },
    },
  },
  {
    tableName: 'inventory',
    timestamps: false,
  }
);

module.exports = Inventory;
