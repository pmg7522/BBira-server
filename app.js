const express = require('express');
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const controllers = require("./controllers");


const app = express();

app.use(express.json())
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
}))

const port = 80;

// app.get('/', (req, res) => {
//     res.status(201).send('Hello World');
// });

app.post("/signup", controllers.signup);
app.post("/login", controllers.login);
app.get("/userinfo", controllers.userinfo);
app.get("/logout", controllers.logout);

// app.listen(port, () => {
//     console.log(`서버가 ${port}번에서 작동중입니다.`);
// });

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