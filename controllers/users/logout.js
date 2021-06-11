const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res) => {
    // 토큰 제거 방법
    res.status(200).send({ message: "logout successed" });
}