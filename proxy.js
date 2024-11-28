const express = require("express");
const cors = require("cors");
const request = require("request");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/proxy", (req, res) => {
  const imageUrl = req.query.url;
  request(imageUrl).pipe(res);
});

app.get("/user-info", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const userAgent = req.headers["user-agent"];

  res.json({
    ip: ip,
    userAgent: userAgent,
  });
});

app.post("/send-notification", async (req, res) => {
  const response = await fetch(
    "https://api.expo.dev/v2/push/send?useFcmV1=true",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    }
  );

  if (response.status === 200) {
    const res = await response.json();
    console.log(res);
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
