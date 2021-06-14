const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


module.exports = async (req, res) => {
    // 첫 로그인 시 노출되는 화면 
    // store의 모든 id만큼 반복한다. 
    // store테이블에서 storename이 있는 모든 정보를 결과 배열에 담는다. -> 마지막까지 담는다.
    const allstoreInfo = await store.findAll()
    const hasNameStore = allstoreInfo.filter(el => el.dataValues.storename !== '')
    const StoreDataToMakeResult = hasNameStore.map(el => el.dataValues)
    const result = [];
    for (let shop of StoreDataToMakeResult) {

        const alltagIdInfo = await tag_store.findAll({ where: { storeId: shop.id }})
        const tagsId = alltagIdInfo.map(el => el.dataValues.tagId)
        const tags = [];
        for (let el of tagsId) {
            let tagInfo = await tag.findOne({ where: { id: el }})
            tags.push(tagInfo.dataValues)
        }
        
        const allitemsInfo = await item.findAll({ where: { storeId: shop.id } })
        const items = allitemsInfo.map(el => el.dataValues)

        result.push({ shop, tags, items })
    }
    return res.status(200).send({ message: "ok", data: result })

    res.status(500).send({ "message": "Internal Server Error" })
}

