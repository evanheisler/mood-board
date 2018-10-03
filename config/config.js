require('fs');
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  },
  test: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  },
  production: {
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    ssl: true,
    dialectOptions: {
      ssl: true
    }
  }
};
