const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


module.exports = async (req, res) => {
    // 첫 로그인 시 노출되는 화면 
    // store의 모든 id만큼 반복한다. 
    // store테이블에서 storename이 있는 모든 정보를 결과 배열에 담는다. -> 마지막까지 담는다.
    const allstoreinfo = await store.findAll()
    const hasNameStore = allstoreinfo.filter(el => el.dataValues.storename !== '')
    const StoreDataToMakeResult = hasNameStore.map(el => el.dataValues)
    const result = [];
    for (let shop of StoreDataToMakeResult) {

        const { phone, storename, address } = shop

        const alltagIdinfo = await tag_store.findAll({ where: { storeId: shop.id } })
        const tagsId = alltagIdinfo.map(el => el.dataValues.tagId)
        const tagname = [];
        for (let ele of tagsId) {
            let taginfo = await tag.findOne({ where: { id: ele } })
            tagname.push(taginfo.dataValues.tagname)
        }

        const allitemsinfo = await item.findAll({ where: { storeId: shop.id } })
        const items = allitemsinfo.map(el => el.dataValues)

        result.push({ storename, phone, address, tagname, items })
    }
    console.log(result)
    return res.status(200).send({ message: "ok", data: result })

    res.status(500).send({ "message": "Internal Server Error" })
}

