export {}

const { Sequelize } = require('sequelize');
const {
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_IP,
  POSTGRES_PORT,
} = require('../config');

// connect to postgres database
const postgresURL = POSTGRES_PASSWORD ? `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_IP}:${POSTGRES_PORT}/${POSTGRES_DATABASE}` : process.env.DATABASE_URL;
const db = new Sequelize(postgresURL, { logging: false });
db.sync();

module.exports = db;