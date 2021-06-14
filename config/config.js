require("dotenv").config();

module.exports = {
  "development": {
    "username": "root",
    "password": "alsrb12",
    "database": "test1",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "localhost",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "1q2w",
    "database": "test1",
    "host": "localhost",
    "dialect": "mysql"
  }
}
