import http from "http";

// // 1
// const server = http.createServer((req, res) => {
//   const time = new Date().getHours();
//   if (time > 22) {
//     res.end("Good Night");
//   } else if (time > 18) {
//     res.end("Good Evening");
//   } else if (time > 12) {
//     res.end("Good Afternoon");
//   } else res.end("Good morning");
// });

// server.listen(3000, () => console.log("Server running..."));

// // 2
// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.end("Home Page");
//   } else if (req.url === "/about") {
//     res.end("About Page");
//   } else if ("/contact") {
//     res.end("Contact Page");
//   } else {
//     res.statusCode = 404;
//     res.end("ERROR: " + res.statusCode + " Page not found");
//   }
// });
// server.listen(3000, () => console.log("Server running..."));

// 3
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  if (req.url !== "/users") {
    res.statusCode = 404;
    res.end("HTTP error " + res.statusCode);
  } else {
    if (req.method === "GET") {
      res.end("Users list");
    } else if (req.method === "POST") {
      res.end("User Created");
    } else {
      res.end("Method Not Allowed");
    }
  }
});

server.listen(3000, () => console.log("Server is running"));
