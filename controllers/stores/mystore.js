const { user, store, tag, tag_store, item} = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();



module.exports = async (req, res) => {
    const authorization = req.headers['authorization'];
    
    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }

    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET); // 해당 유저의 user 정보
    if (!data) {
        return res.status(404).send({ data: null, message: "데이터에 없는 유저입니다." })
    }
    else {
      // 해당 로그인한 사람의 item, store, tag테이블에 접근하여 데이터를 보내준다. 
        const allItemsInfo = await item.findAll({ where: { storeId: data.storeId } })
        const items = allItemsInfo.map(el => el.dataValues)
        
        const storeInfo = await store.findOne({ where: { id: data.storeId } })
        const stores = storeInfo.dataValues

        const alltagIdinfo = await tag_store.findAll({ where: { storeId: data.storeId } })
        const tagsId = alltagIdinfo.map(el => el.dataValues.tagId)

        const tags = [];
        for (let el of tagsId) {
            let taginfo = await tag.findOne({ where: { id: el } })
            tags.push(taginfo.dataValues)
        }

        return res
        .status(200)
        .send({ 
            "message": '내 스토어 정보 여깃어 !', 
            "data": { tags, stores, items }  
        })
    }
    res.status(500).send({ "message": "Internal Server Error" })
}
