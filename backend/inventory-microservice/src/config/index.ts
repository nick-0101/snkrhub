module.exports = {
  POSTGRES_IP: process.env.POSTGRES_IP || 'inventory-microservice_db',
  POSTGRES_PORT: process.env.POSTGRES_PORT || 5432,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,

  SESSION_SECRET: process.env.SESSION_SECRET,
};
