const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const { nickname, phone, address, storename, password, tagname } = req.body
    // tagname = "tag1,tag2"로 들어온다. split(',')
    if (!nickname || !phone || !address || !storename || !password) {
        return res.status(422).send({ "message": "Fill in blank" })
    }

    const authorization = req.headers['authorization'];
    
    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }

    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    
    if (data) {
      await user.update({ nickname, password }, { where: { id: data.id } })
      await store.update({ phone, address, storename }, { where: { id: data.storeId } })

      const tags = await tag_store.findAll({ where: { storeId: data.storeId }})
      const tagsInfo = tags.map(el => el.dataValues.tagId)

      for(let el of tagsInfo){
        await tag.destroy({ where: { id: el }})
      }

      const tagArr = tagname.split(',')
      for(let el of tagArr){
        await tag.create({ tagname: el })
      }
      // 태그도 변경 가능하게 수정
    //   await tag_store.create({ storeId, tagId: taginfo.dataValues.id })

      const newUserInfo = await user.findOne({ where: { id: data.id }})
      const newStoreInfo = await store.findOne({ where: { id: data.storeId }})
      const newTagsId = await tag_store.findAll({ where: { storeId: data.storeId }})
      const newTagsname = await tag.findAll({ where: { id: newTagsId }})
      const newTagsA = newTagsname.map(el => el.dataValues)
      const newTags = [];
      for(let el of newTagsA){ 
        const newTagInfo = await tag.findOne({ where:{ id: el }})
        newTags.push(newTagInfo.dataValues)
      }
      delete newUserInfo.dataValues.password

      const tagnameArr = tagname.split(',')

      for (let el of tagnameArr) {
          await tag.create({ tagname: el })
          const taginfo = await tag.findOne({ where: { tagname: el } })
          await tag_store.create({ storeId: data.storeId, tagId: taginfo.dataValues.id })
      }
      const newTags = await tag_store.findAll({ where: { storeId: data.storeId }})
      const newTagsInfo = newTags.map(el => el.dataValues.tagId)

      const tagnames = [];

      for (let el of newTagsInfo) {
        const tagB = await tag.findOne({ where: { id: el }})
        tagnames.push(tagB)
      }

      return res.status(205).send({ 
          message: "userinfo Fixed", 
          data: { ...newUserInfo.dataValues, ...newStoreInfo.dataValues, tagnames }
      })
    }
    else {
        return res.status(404).send({ "message": '없는 유저입니다.'})
    }

    res.status(500).send({ "message": 'Internal Server Error' })
}