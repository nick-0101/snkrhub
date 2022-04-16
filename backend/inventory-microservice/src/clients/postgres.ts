const { Sequelize } = require('sequelize');

// connect to postgres database
// able to reference "postgres" as docker uses dns to resolve the name of postgres
const db = new Sequelize(process.env.DATABASE_URL);

module.exports = db;