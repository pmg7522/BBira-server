const express = require('express');
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const controllers = require("./controllers");
require('dotenv').config()
// const session = require('express-session');
const cookieParser = require("cookie-parser");
const models = require('./models');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


const app = express();

// models.sequelize.sync()
//   .then(() => {
//     console.log('✓ DB connection success.');
//     console.log('  Press CTRL-C to stop\n');
//   })
//   .catch(err => {
//     console.error(err);
//     console.log('✗ DB connection error. Please make sure DB is running.');
//     process.exit();
//   });



app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000", // 배포환경 : s3 도메인
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}))

app.use(cookieParser());

const port = 3000; //배포환경: 80

// users //
app.post("/fixuserinfo", controllers.fixuserinfo); // tagname: arr, nickname: str, email: str, password: str, phone: str, address: str, storename: str
app.post("/signup", controllers.signup); // tagname: arr, nickname: str, email: str, password: str, phone: str, address: str, storename: str
app.post("/login", controllers.login); // email: str, password: str
app.post("/kakaologin", controllers.kakaologin);
app.post("/githublogin", controllers.githublogin);
app.get("/logout", controllers.logout);
app.get("/dropuser", controllers.dropuser);
app.get("/userinfo", controllers.userinfo);

// stores //
app.post("/fixiteminfo", upload.single('itemphoto'), controllers.fixiteminfo);
app.post("/itemregister", upload.single('itemphoto'), controllers.itemregister);
app.get("/allstore", upload.single('itemphoto'), controllers.allstore);
app.get("/mystore", upload.single('itemphoto'), controllers.mystore);

app.post("/dropitem", controllers.dropitem);

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
