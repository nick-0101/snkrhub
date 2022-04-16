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
// able to reference "postgres" as docker uses dns to resolve the name of postgres
const postgresURL = `postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_IP}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`;
const db = new Sequelize(postgresURL, { logging: false });

module.exports = db;