const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    // 출력값 nickname email storename phone address
    const authorization = req.headers['authorization'];
    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    else {
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, process.env.ACCESS_SECRET);

        if (!data) {
            return res.status(404).send({ data: null, message: "데이터에 없는 유저입니다." })
        }
        else {
            delete data.password

            const storeId = data.storeId
            const storeInfo = await store.findOne({ where: { id: storeId }})
    
            const { nickname, email } = data
            const { storename, phone, address } = storeInfo.dataValues

            const alltagIdinfo = await tag_store.findAll({ where: { storeId: data.storeId } })
            const tagsId = alltagIdinfo.map(el => el.dataValues.tagId)
    
            const tagname = [];
            for (let el of tagsId) {
                let taginfo = await tag.findOne({ where: { id: el } })
                tagname.push(taginfo.dataValues.tagname)
            }

            return res.status(200).send({ 
                "message": "유저 정보 여깃어 !", 
                "data": { nickname, email, storename, phone, address, tagname }
            });
        }
    }
    res.status(500).send({ "message": "Internal Server Error" })
}