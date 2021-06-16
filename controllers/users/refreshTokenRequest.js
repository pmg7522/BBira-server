const {
    checkRefeshToken,
    generateAccessToken,
    resendAccessToken,
  } = require('../tokenFunctions');
const { user, store, item, tag, tag_store } = require('../../models');

module.exports = (req, res) => {
const refreshToken = req.cookies.refreshToken;
  
if (!refreshToken) {
    return res.status(400).send({ message: 'refreshToken이 없습니다.' });
}

const refreshTokenData = checkRefeshToken(refreshToken);
  if (!refreshTokenData) {
    return res.json({
      data: null,
      message: 'invalid refresh token, please log in again',
  });
}  

const { id } = refreshTokenData;
    user.findOne({ where: { id } })
      .then((data) => {
        if (!data) {
          return res.json({
            data: null,
            message: 'refresh token has been tempered',
          });
        }
        delete data.dataValues.password;

        const newAccessToken = generateAccessToken(data.dataValues);
        resendAccessToken(res, newAccessToken, data.dataValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };