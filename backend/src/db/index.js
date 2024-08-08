const { Sequelize } = require("sequelize");

// Use environment variables or replace with your online PostgreSQL database URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // For self-signed certificates, set this to false
    },
  },
  logging: false, // Disable logging or set to console.log for debugging
});

module.exports = sequelize;
