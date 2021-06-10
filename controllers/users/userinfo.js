const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    if (!req.session.userId) {
      res.status(401).send({ "message": "Not found Session" });
    } else {
      const userInfo = await user.findOne({ where: { id: req.session.userId } });
      res.status(200).send({ "message": "ok", "data": userInfo });
    }
}