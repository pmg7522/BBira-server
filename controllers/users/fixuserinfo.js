const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 토큰 받고
    // 유저정보 가져와서 아래 정보를 업데이트하고
    // nickname, storename, address, phone, password
    const { nickname, phone, address, storename, password } = req.body
    
    if (!nickname || !phone || !address || !storename || !password) {
        return res.status(422).send({ "message": "Fill in blank" })
    }

    const authorization = req.headers['authorization'];
    
    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    console.log(authorization)
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userInfo = await user.findOne({ where: { id: data.id }})
    

    if (userInfo) {
      await user.update({ nickname, password }, { where: { id: data.id } })
      const storeId = userInfo.dataValues.store_id
      await store.update({ phone, address, storename }, { where: { id: storeId } })

      const newUserInfo = await user.findOne({ where: { id: data.id }})
      const newStoreInfo = await store.findOne({ where: { id: storeId }})
      
      delete newUserInfo.dataValues.password
    
      
      return res.status(205).send({ 
          message: "userinfo Fixed", 
          data: { ...newUserInfo.dataValues, ...newStoreInfo.dataValues }
      })
    }        

    res.status(500).send({ "message": 'Internal Server Error' })
}