const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const env = require("dotenv").config().parsed ?? {};

const app = express();

// import * as dotenv from "dotenv";

// const env = dotenv.config().parsed ?? {};

console.log("env", env);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const CLIENT_ID = env.CLIENT_ID;
const CLIENT_SECRET = env.CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/callback";

// async function getAccessToken(code) {
//   const response = await axios.post(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`, {}, {
//     headers: {
//       accept: 'application/json',
//     },
//   });
