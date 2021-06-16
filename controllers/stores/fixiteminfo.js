const { user, store, item, tag, tag_store } = require('../../models');
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
        const { id, itemname, itemphoto, itemdesc, itemprice } = req.body;
        await item.update({ itemname, itemphoto, itemdesc, itemprice }, { where: { id }})
        res.status(205).send({ "message": 'item information is fixed'})
    }

    res.status(500).send({ "message": "Internal Server Error" })
}
