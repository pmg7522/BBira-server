const { user, store, tag, item } = require('../../models');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res) => {
    // "/allstoredata" 최초 모든 데이터베이스 데이터 전달
    // 모든 정보를 순서대로 배열에 담아서 합쳐서 
//  [
//    {
//     "message": 'ok', 
//     "data": {
//       tagname: "cat"
//       storename: "Doraemon shop"
//       itemname: "Doraemon doll"
//       itemphoto: "Doraemon.jpg"
//       itemdesc: "Doraemon shop beat seller"
//       itemprice: "20,000"
//       phone: "010-1234-5678"    
//     } 
//   }
// ]
}