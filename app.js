const express = require('express');
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const controllers = require("./controllers");
require('dotenv').config()
const session = require('express-session');

const app = express();

app.use(express.json())
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}))

app.use(
  session({
    secret: 'BBira',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: "localhost", // 클라이언트의 요청 도메인
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    },
  })
);

const port = 3000;

app.post("/fixuserinfo", controllers.fixuserinfo);
app.post("/signup", controllers.signup);
app.post("/login", controllers.login);
app.get("/logout", controllers.logout);
app.get("/userinfo", controllers.userinfo);
app.get("/dropuser", controllers.dropuser);


app.post("/fixiteminfo", controllers.fixiteminfo);
app.post("/dropitem", controllers.dropitem);
app.post("/allstoredata", controllers.allstoredata);
app.get("/itemregister", controllers.itemregister);



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