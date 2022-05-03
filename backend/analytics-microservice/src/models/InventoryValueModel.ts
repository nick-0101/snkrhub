export {}

const db = require('../clients/postgres');
const { DataTypes } = require('sequelize');

const InventoryValue = db.define('inventory_value', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inventoryvalue: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },  
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    updatedAt: false,
    createdAt: false,
    timestamps: false,
  }
);

module.exports = InventoryValue;
