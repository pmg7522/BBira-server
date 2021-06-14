const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    console.log(req.body)
    const authorization = req.headers['authorization'];

    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    const tagId = await tag_store.findAll({ where: { storId: data.id }})
    const tagsInfo = tagId.map(el => el.dataValues.tagId)

    await store.destroy({ where: { id: data.storeId }})
    await user.destroy({ where: { id: data.id }})

    

    await tag_store.destroy({ where: { storeId } })
    await tag.destroy({ where: {  } })
    return res.status(205).send({ "message": '회원탈퇴 완료' })

    return res.status(500).send({ "message": "Internal Server Error" })

}