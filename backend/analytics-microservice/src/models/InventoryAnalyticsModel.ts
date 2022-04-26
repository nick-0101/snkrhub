export {}

const db = require('../clients/postgres');
const { DataTypes } = require('sequelize');

const InventoryAnalytics = db.define('inventory_analytics', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    inventorycount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    netincome: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    inventorysold: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inventoryvalue: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
    timestamps: true,
  }
);

module.exports = InventoryAnalytics;
