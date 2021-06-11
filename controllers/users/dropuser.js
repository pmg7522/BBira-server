const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 클라이언트에서 이메일 & 상호명을 받는다. 
    // 테이블에서 찾아 없앤다. 
    // ok res를 보낸다. 
    const authorization = req.headers['authorization'];

    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    console.log(authorization)
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const userInfo = await user.findOne({ where: { id: data.id }})

    if (userInfo) {
        const storeId = userInfo.dataValues.store_id
        await store.destroy({ where: { id: storeId }})
        await user.destroy({ where: { id: data.id }})
        res.status(205).send({ "message": '재가입은 유료입니다.' })
    }
    else {
        res.status(500).send({ "message": "Internal Server Error" })
    }

}