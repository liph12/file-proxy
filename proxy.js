const express = require("express");
const cors = require("cors");
const request = require("request");
const axios = require("axios");

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

app.post("/send-notification", async (req, res) => {
  try {
    const response = await axios.post(
      "https://exp.host/--/api/v2/push/send",
      req.body,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error sending notification:", error.message);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on port 3001");
});
