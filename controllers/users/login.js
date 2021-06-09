const {  } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res) => {
    const userInfo = await .findOne({
      where: { email: req.body.email, password: req.body.password }
    })
        
    if (!userInfo) {
      res.status(404).send("invalid user");
    } else {
      req.session.userId = userInfo.id;
      res.status(200).send("ok");
    }
}