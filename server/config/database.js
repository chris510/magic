const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.POSTGRES_SCHEMA || 'magic',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'magic', {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.POSTGRES_SSL == "true"
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});


module.exports = {
  Sequelize,
  sequelize
};
