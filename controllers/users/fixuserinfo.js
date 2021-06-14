const { user, store, item, tag, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {

    const { nickname, phone, address, storename, password, tagname } = req.body
    
    if (!nickname || !phone || !address || !storename || !password ||!tagname) {
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

      const newUserInfo = await user.findOne({ where: { id: data.id }})
      const newStoreInfo = await store.findOne({ where: { id: data.storeId }})
      const newTagsId = await tag_store.findAll({ where: { storeId: data.storeId }})
      console.log(data)
      console.log(newTagsId)
      const newTagsname = await tag.findAll({ where: { id: newTagsId }})
      const newTagsA = newTagsname.map(el => el.dataValues)
      const newTags = [];
      for(let el of newTagsA){ 
        const newTagInfo = await tag.findOne({ where:{ id: el }})
        newTags.push(newTagInfo.dataValues)
      }
      delete newUserInfo.dataValues.password
    
      return res.status(205).send({ 
          message: "userinfo Fixed", 
          data: { ...newUserInfo.dataValues, ...newStoreInfo.dataValues, tagname: newTags }
      })
    }
    else {
        return res.status(404).send({ "message": '없는 유저입니다.'})
    }

    res.status(500).send({ "message": 'Internal Server Error' })
}