const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


module.exports = async (req, res) => {

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

