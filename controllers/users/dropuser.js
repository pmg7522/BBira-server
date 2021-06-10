const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 클라이언트에서 이메일 & 상호명을 받는다. 
    // 테이블에서 찾아 없앤다. 
    // ok res를 보낸다. 
    const { email, storename } = req.body
    if (email || storename) {
        await user.destroy({ where: email })
        await store.destroy({ where: storename })
        res.status(205).send({ "message": 'Reset Content' })
    }
    else {
        res.status(500).send({ "message": "Internal Server Error" })
    }
    
}