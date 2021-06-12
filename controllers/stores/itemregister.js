const { store, item } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const authorization = req.headers['authorization'];
    
    if (!authorization) { 
        return res.status(401).send({ "message": 'invalid access token'})
    }
    
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    const { itemname, itemphoto, itemdesc, itemprice } = req.body;

    if (!itemname || !itemphoto || !itemdesc || !itemprice) {
        return res.status(422).send({ message: "fill in blank" })
    };
    
    const storeId = data.dataValues.id;
    await item.create({ itemname, itemphoto, itemdesc, itemprice, store_id: storeId });
    return res.status(201).send({ "message": "register successed" });

    return res.status(500).send({ message: "Internal Server Error" });
}