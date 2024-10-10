const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
app.use(cors());

app.get("/proxy", (req, res) => {
  const imageUrl = req.query.url;
  request(imageUrl).pipe(res);
});

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
