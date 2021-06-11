const express = require('express');
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const controllers = require("./controllers");
require('dotenv').config()
// const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000", // 배포환경 : s3 도메인
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}))

app.use(cookieParser());

const port = 3000; //배포환경: 80

// users //
app.get("/fixuserinfo", controllers.fixuserinfo); // email, nickname, address, storename, phone
app.post("/signup", controllers.signup); // email, nickname, address, storename, phone, password
app.post("/login", controllers.login); // email, password
app.get("/logout", controllers.logout);
app.get("/dropuser", controllers.dropuser); // email
app.get("/userinfo", controllers.userinfo);

// stores //
app.get("/fixiteminfo", controllers.fixiteminfo);
app.get("/dropitem", controllers.dropitem);
app.get("/allstore", controllers.allstore);
app.get("/itemregister", controllers.itemregister);
app.get("/mystore", controllers.mystore);


let server;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(port, () => console.log(`https 서버가 ${port}번에서 작동중입니다.`));
} else {
  server = app.listen(port,() => {
    console.log(`http 서버가 ${port}번에서 작동중입니다.`);
  })
}