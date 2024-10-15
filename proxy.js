const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

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

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
