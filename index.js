import express from "express";
import { rateLimitter } from "./rate_limitter.js";
import ip from "ip";
import fs from "fs";

const app = express();

if (!fs.existsSync("log.txt")) {
  fs.writeFileSync("log.txt", "[]");
}

app.get("/", rateLimitter, async (req, res) => {
  res.send("Data");
});

app.get("/userDetails", async (req, res) => {
  res.send("User Data is Here");
});

app.listen(3000, console.log("App is Running"));
