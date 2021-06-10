const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    console.log(req.body)
    const userInfo = await user.findOne({
        where: { email: req.body.email, password: req.body.password }
      })

      if (!userInfo) {
        res.status(404).send({ message: "invalid user" });
      } else {
        req.session.userId = userInfo.email;
        res.status(200).send({ message: "ok" });
      }
}