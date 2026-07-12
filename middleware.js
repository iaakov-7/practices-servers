// 1
// תהליך שמטפל בבקשות לפני שהם מתחילות להפעיל את הפונקצייה שלהם

// 2
// הבקשה שמתקבלת , התשובה שצריך לשלוח , והקריאה לפונקצייה הבאה

// 3
// הפונקצייה נתקעת ולרא קורים לה כשרוצים שיוחזר כבר תשובה

// 4
//  הראשון זה על כל הראוטים השני זה נוח ללוגר בדוגמא השנייה זה על ראוט ספציפי והשלישי זה על נתיב ספציפי

// 5
// כי הוא חייב לפעול על כל הבקשות של POST

// 6
function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

// 7
import express from "express";
const app = express();

app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  res.json({ received: req.body });
});

// 8
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No header" });
  }

  next();
}

// 9
// א. יודפס לוגר ואז ההדפסה של `Home`
// ב.  יודפס לוגר ויתקבל 401
// ג. יודפס לוגר ויודפס `Data`

// 10
// אין return

// 11
function requestTimer(req, res, next) {
  const time = new Date();
  req.startTime = time;
  next();
}

// 12
const app = express();
app.use(express.json());
function logger(req, res, next) {
  console.log(req.url, req.method);
  next();
}
app.use(logger);
app.get("/public", (req, res) => {
  res.json({ message: "Public" });
});
app.get("/private", auth, (req, res) => {
  res.json({ message: "Secret" });
});

// 13
function validateBody(fields) {
  return (req, res, next) => {
    for (const f of fields) {
      if (!req.body || req.body[f] === "undfind") {
        return res.status(400).json({ message: `Missing required field ${f}` });
      }
    }
    next();
  };
}
