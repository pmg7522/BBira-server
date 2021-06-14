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
    if (!data) {
        return res.status(404).send({ data: null, message: "데이터에 없는 유저입니다." })
    }
    
    const { itemname, itemphoto, itemdesc, itemprice } = req.body;

    if (!itemname || !itemphoto || !itemdesc || !itemprice) {
        return res.status(422).send({ message: "fill in blank" })
    };
    
    await item.create({ itemname, itemphoto, itemdesc, itemprice, storeId: data.storeId });
    return res.status(201).send({ "message": "item register successed" });

    return res.status(500).send({ message: "Internal Server Error" });
}