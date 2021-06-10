const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 클라이언트에게 이메일 & 상호명을 달라한다. 
    // 수정하고
    // UPDATE SET WHERE
    // nickname, storename, address, phone
    const { email, nickname, phone, address, storename } = req.body
    
    if (!email || !nickname || !phone || !address || !storename) {
        res.status(422).send({ "message": "Unprocessable Entity" })
    }
    else {
        await user.update({ nickname }, { where: { email: email } })
        const userStoreId = user.findOne({ where: email })
        const storeId = userStoreId.dataValues.store_id
        await store.update({ phone, address, storename }, { where: {id: storeId} })
        res.status(205).send({ "message": "ok" })
    }
    
    console.log("서버 담당 누구 ?")
    res.status(500).send({ "message": 'Internal Server Error' })
}