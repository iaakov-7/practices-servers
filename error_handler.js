import express from "express";
import { error } from "node:console";

const app = express();

let totalRequests = 0;
// 1
function middlwareTime(req, res, next) {
  const time = new Date().toLocaleDateString();
  req.requestTime = time;
  next();
}
// 9
function errorHandler(err, req, res, next) {
  return res.json({ error: true, message: err.message });
}

// 11
function blockIp(req, res, next) {
  if (req.ip === "123.123.123.123")
    return res.status(403).json({ message: "Your IP is blocked" });
  next();
}

// 16

function countReq(req, res, next) {
  totalRequests += 1;
  console.log(`totalRequests:${totalRequests}`);
  next();
}
// 25
function logger(req, res, next) {
  const time = new Date().toLocaleDateString();
  console.log("[LOG] " + time, req.method, req.url);
  next();
}
app.use(express.json());
app.use(logger);
app.use(countReq);
app.use(blockIp);
app.use(middlwareTime);
app.get("/api", (req, res) => {
  console.log(req.requestTime);
  // 29
  throw new Error("Database failed");
  res.json({ message: "Home" });
});

// 27
function validBody(req, res, next) {
  if (
    !req.body.num1 ||
    typeof req.body.num1 !== "number" ||
    !req.body.num2 ||
    typeof req.body.num2 !== "number"
  ) {
    return res.status(400).send("Both inputs is required must be numbers");
  }
  next();
}
app.post("/calculate", validBody, (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  res.json({ message: num1 * num2 });
});

// 14
function validAge(req, res, next) {
  if (isNaN(Number(req.params.age)) || req.params.age < 0) {
    return res.status(400).send("Invalid age");
  }
  next();
}
app.get("/user/:age", validAge, (req, res) => {
  res.json({ message: req.params.age });
});

app.use(errorHandler);
app.listen(3000, () => console.log("Server is listening  port 3000"));
