const { Users } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res) => {
    serverLogout: (req, res) => {
    req.session.destroy();
    res.status(200).send("ok");
    }
}