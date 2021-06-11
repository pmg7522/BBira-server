const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


// isAuthorized: (req) => {
//     const authorization = req.headers["authorization"];
//     if (!authorization) {
//       return null;
//     }
//     const token = authorization.split(" ")[1];
//     try {
//       return verify(token, process.env.ACCESS_SECRET);
//     } catch (err) {
//       // return null if invalid token
//       return null;
//     }
//   }
module.exports = async (req, res) => {
    // 입력값 email & storename 을 받는다. 
    // 출력값 nickname email storename phone address
    // 유저 인포를 찾기 위해 이메일 & 상호명 클라이언트 쪽에서 받아야 한다. 
    // 받아온 이메일과 데이터베이스의 유저 테이블 & 스토어 테이블에서 이메일이 같은 유저를 찾아온다. 
    const authorization = req.headers['authorization'];

    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    else {
        console.log(authorization)
        
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);
        console.log(data)

        const userInfo = await user.findOne({ where: { id: data.id }})

        if (!userInfo) {
            return res.status(404).send({ data: null, message: "토큰이 없는 유저입니다." })
        }
        else {
            delete userInfo.dataValues.password

            const storeId = userInfo.dataValues.store_id
            const storeInfo = await store.findOne({ where: { id: storeId }})
    
            const { nickname, email } = userInfo.dataValues
            const { storename, phone, address } = storeInfo.dataValues
            
            return res.status(200).send({ 
                "message": "유저 정보 여깃어 !", 
                "data": { nickname, email, storename, phone, address }
            });
        }
    }
    res.status(500).send({ "message": "Internal Server Error" })
}