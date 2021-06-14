const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const { email, password, nickname, storename, address, phone, tagname } = req.body

    if (!storename || !address || !phone || !tagname) { // 사용자 회원가입
        if (!email || !password || !nickname) {
            return res.status(422).send({ message: "fill in blank" })
        }
        if (tagname) {
            return res.status(422).send({ message: "태그는 사업자만 등록 가능합니다." })
        }
        await user.findOne({
            where: { email }
        })
        .then(async (data) => {
            if (data) {
                return res.status(409).send({ message: "email exists" })
            }
            const storeInfo = await store.create({ storename, address, phone })
            const storeId = storeInfo.dataValues.id
            await user.create({ email, password, nickname, storeId })
            return res.status(201).send({ "message": "signup successed" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({ message: "Internal Server Error" })
        })
    }
    else { // 사업자 회원가입
        if (!email || !password || !nickname || !storename || !address || !phone || !tagname) {
            return res.status(422).send({ message: "사업자 회원가입에 필요한 정보를 모두 입력 해야 합니다." })
        }

        await user.findOne({
            where: { email }
        })

        .then(async (data) => {
            if (data) {
                res.status(409).send({ message: "email exists" })
            }
            else {
                const tagnameArr = tagname.split(',')
                const storeInfo = await store.create({ storename, address, phone })
                const storeId = storeInfo.dataValues.id // 스토어 아이디 추출
    
                for (let el of tagnameArr) {
                    await tag.create({ tagname: el })
                    const taginfo = await tag.findOne({ where: { tagname: el } })
                    await tag_store.create({ storeId, tagId: taginfo.dataValues.id })
                }
    
                await user.create({ email, password, nickname, storeId })
                res.status(201).send({ "message": "signup successed" })
            }
        })
    }
}