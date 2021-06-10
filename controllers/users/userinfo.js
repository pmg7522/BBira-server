const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 입력값 없음 
    // 출력값 nickname email storename phone address
    // 유저 인포를 찾기 위해 이메일 & 상호명 클라이언트 쪽에서 받아야 한다. 
    // 받아온 이메일과 데이터베이스의 유저 테이블 & 스토어 테이블에서 이메일이 같은 유저를 찾아온다. 
    if (!req.body.email || !req.body.storename) {
        res.status(401).send({ "message": "Not found" })
    }
    else {
        const userInfo = user.findOne({ email })
        const storeInfo = store.findOne({ storename })
        const { nickname, email,  } = userInfo.dataValues
        const { storename, phone, address } = storeInfo.dataValues
        
        res.status(200).send({ 
            "message": "ok", 
            "data": { nickname, email, storename, phone, address } 
        });
    }

    res.status(500).send({ "message": "Internal Server Error" })
}