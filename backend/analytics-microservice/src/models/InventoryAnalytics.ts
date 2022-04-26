export {}

const db = require('../clients/postgres');
const { DataTypes } = require('sequelize');

const InventoryValue = db.define('inventory_value', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    inventoryCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    netIncome: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    inventorySold: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  }, {
    freezeTableName: true,
    updatedAt: false,
    createdAt: true,
    timestamps: true,
  }
);

module.exports = InventoryValue;
