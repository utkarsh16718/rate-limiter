import fs from "fs";

const MAX_REQUESTS = 5;
const TIME_WINDOW = 10 * 1000; // 1 minute in milliseconds

export function rateLimitter(req, res, next) {
  const currentTime = new Date().getTime();

  let data = JSON.parse(fs.readFileSync("log.txt", "utf-8"));
  if (!Array.isArray(data)) {
    return res.status(500).send("log.txt must contain a JSON array");
  }

  const newData = data.filter(
    (element) =>
      element.ip == req.ip && element.timestamp > currentTime - TIME_WINDOW,
  );

  if (newData.length >= MAX_REQUESTS) return res.send("INVALID");

  let obj = {
    userId: "1232",
    ip: req.ip,
    timestamp: currentTime,
  };

  data.push(obj);
  fs.writeFileSync("log.txt", JSON.stringify(data, null, 2));
  next();
}
