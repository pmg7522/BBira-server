const { user, store, tag, item, tag_store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {

    const authorization = req.headers['authorization'];
    
    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    console.log(authorization)
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);
    console.log(data)
    // data에는 로그인한 사용자의 스토어아이디가 있다. 
    // 스토어 아이디로 아이탬 테이블의 store_id와 data.id가 같은 모든 행을 findAll로 가져온다 .
    // const { phone, storename } = store.dataValues 
    // const allitems = item.findAll({ where: { store_id: storeId } })
    // console.log(allitems)

    // storeId값과 같은 tag_store 테이블의 store_id를 가진 행을 모두 가져온다. 
    // const alltags = tag_store.findAll({ where: { store_id: storeId } })
    // tag_id 값들을 한곳에 모은다.  
    // tag테이블의 id값 alltags의 tag_id값들이 같은 값을 찾는다.
    const storeId = data.id
    const allitems = await item.findAll({ where: { store_id: storeId } }).then(data => {
        return data.map(el => el.dataValues)
    })
    console.log(allitems)

    const storeInfo = await store.findOne({ where: { id: storeId } })
    console.log(storeInfo.dataValues)
    const { phone, storename } = storeInfo.dataValues

    const tagStoreId = tag_store.findAll({ where: { store_id: storeId } })
    console.log(tagStoreId)

    // 
}

// { "message": 'ok', 
//   "data": {
//     phone: "010-1234-5678"    
//     storename: "Doraemon shop"
//     tagname: ["tag1", "tag2"]
//     item: [{  // allitems
//       itemname: "Doraemon doll"
//       itemphoto: "Doraemon.jpg"
//       itemdesc: "Doraemon shop beat seller"
//       itemprice: "20,000"
//     }, {}, {}]
//   } 
// }