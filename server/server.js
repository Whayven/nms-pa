require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const userCtrl = require("./Controllers/userController");
const starCtrl = require("./Controllers/starController");
const planetCtrl = require("./Controllers/planetController");
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
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

app.get("/api/auth/refresh", userCtrl.getSession);
app.post("/api/auth/login", userCtrl.login);
app.post("/api/auth/logout", userCtrl.logout);
app.post("/api/auth/register", userCtrl.register);

app.get("/api/archive", starCtrl.getStars)
app.get("/api/archive/me", starCtrl.getUserStars);
app.get("/api/archive/:starid", starCtrl.getStar);
app.get("/api/archive/:starid/planets", starCtrl.getStarPlanets);
app.get("/api/archive/planets/:planetid", planetCtrl.getPlanetInfo);

app.post("/api/upload/star", starCtrl.createStar)
app.post("/api/upload/planet", planetCtrl.createPlanet);

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}.`);
});
