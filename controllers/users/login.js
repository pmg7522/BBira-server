const { user } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


module.exports = async (req, res) => {
    const { email, password } = req.body
    const userInfo = await user.findOne({
        where: { email }
    })

    if (!userInfo) {
        return res.status(404).send({ message: "invalid user" });
    } 
    if (!email || !password) {
      return res.status(422).send({ message: "fill in blank" })
    }
    else {
      delete userInfo.dataValues.password
      const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
        expiresIn: '0.5h'
      });
      const refreshToken = jwt.sign(userInfo.dataValues, process.env.REFRESH_SECRET, {
        expiresIn: '1h'
      });

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        sameSite: 'none',
        httpOnly: true
      })
      .send({ 
        message: "login successed",
        data: { accessToken: accessToken }
      })
  }
}
