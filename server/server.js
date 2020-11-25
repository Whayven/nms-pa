require("dotenv").config();
const express = require("express");
const session = require("express-session");
const aws = require("aws-sdk");
const massive = require("massive");
const userCtrl = require("./Controllers/userController");
const starCtrl = require("./Controllers/starController");
const planetCtrl = require("./Controllers/planetController");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
const app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("db connected");
});

app.get("/api/sign-s3", (req, res) => {
  aws.config = {
    region: 'us-east-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    signatureVersion: 'v4'
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
})

app.get("/api/auth/refresh", userCtrl.getSession);
app.post("/api/auth/login", userCtrl.login);
app.post("/api/auth/logout", userCtrl.logout);
app.post("/api/auth/register", userCtrl.register);

app.get("/api/archive", starCtrl.getStars)
app.get("/api/archive/me", starCtrl.getUserStars);
app.get("/api/archive/:starid", starCtrl.getStar);
app.get("/api/archive/:starid/planets", starCtrl.getStarPlanets);
app.get("/api/archive/planets/:planetid", planetCtrl.getPlanetInfo);
app.get("/api/archive/images/:planetid", planetCtrl.getPlanetImages);

app.post("/api/upload/star", starCtrl.createStar)
app.post("/api/upload/planet", planetCtrl.createPlanet);
app.post("/api/upload/image", planetCtrl.uploadImage);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}.`);
});
