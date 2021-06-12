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
app.post("/fixuserinfo", controllers.fixuserinfo);
app.post("/signup", controllers.signup);
app.post("/login", controllers.login);
app.get("/logout", controllers.logout);
app.get("/dropuser", controllers.dropuser);
app.get("/userinfo", controllers.userinfo);

// stores //
app.post("/fixiteminfo", controllers.fixiteminfo);
app.post("/itemregister", controllers.itemregister);
app.get("/dropitem", controllers.dropitem);
app.get("/allstore", controllers.allstore);
app.get("/mystore", controllers.mystore);


let server;
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(port, () => console.log(`https 서버가 ${port}번에서 작동중입니다.`));
// } else {
  server = app.listen(port,() => {
    console.log(`http 서버가 ${port}번에서 작동중입니다.`);
  })
// }
