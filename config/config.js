require("dotenv").config();

module.exports = {
  "development": {
    "username": "root",
    "password": "1q2w",
    "database": "test",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.DATABASE_USERNAME,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "localhost",
    "dialect": "mysql"
  }
}
