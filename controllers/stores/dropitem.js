const { store, item } = require('../../models');
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
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    console.log(data);
    const itemInfo = await item.findOne({ where: { store_id: data.id }})

    if (itemInfo) {
        const storeId = itemInfo.dataValues.store_id
        await item.destroy({ where: { store_id: data.id }})
        res.status(205).send({ "message": '재가입은 유료입니다.' })
    }
    else {
        res.status(500).send({ "message": "Internal Server Error" })
    }

}