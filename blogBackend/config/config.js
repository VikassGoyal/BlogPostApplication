require('dotenv').config();
module.exports = {
    development: {
      username: process.env.PG_USER, // Replace with your PostgreSQL username
      password: process.env.PG_PASSWORD, // Replace with your PostgreSQL password
      database: process.env.PG_DATABASE, // Replace with your PostgreSQL database name
      host: process.env.PG_HOST,
      dialect: 'postgres',
    },
  };