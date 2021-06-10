const { user, store } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res) => {
    const { email, password, nickname, storename, address, phone } = req.body

    if (!email || !password || !nickname) {
        res.status(422).send({ message: "Unprocessable Entity" })
    }

    await user.findOne({
        where: { email }
    })
    .then(async (data) => {
        if (data) {
            res.status(409).send({ message: "email exists" })
        } 
        else {
            const storeInfo = await store.create({ storename, address, phone })
            const userInfo = await user.create({ email, password, nickname })
            const { nickname, email,  } = userInfo.dataValues
            const { storename, phone, address } = storeInfo.dataValues
        
            res.status(201).send({ "message": "ok", })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({ message: "Internal Server Error" })
    })
}