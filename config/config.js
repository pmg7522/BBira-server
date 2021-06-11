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
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": "BBira",
    "host": process.env.DATABASE_HOST,
    "port": 13306,
    "dialect": "mysql"
  }
}
