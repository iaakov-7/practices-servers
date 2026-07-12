// import http from "http";
// import { URL } from "url";

// const server = http.createServer();

// server.on("request", (req, res) => {
//   res.end("Closed");
// });
// server.listen(3000, () => console.log("Server is running"));

// 1
function extractId(url) {
  const parts = url.split("/");
  return Number(parts[parts.length - 1]);
}

// 2
function parseQuery(url) {
  const queryString = url.split("?")[1] || "";
  const result = {};
  if (queryString) {
    const pairs = queryString.split("&");
    for (const pair of pairs) {
      const [key, value] = pair.split("=");
      result[key] = value;
    }
  }
  return result;
}
console.log(parseQuery("/users?role=admin&page=2"));

// 3

function getQueryParams(rawUrl) {
  const parsed = new URL(rawUrl, "http://localhost");
  const qs = parsed.searchParams;
  return {
    page: qs.get("page") || "1",
    limit: qs.get("limit") || "10",
    sort: qs.get("sort"),
  };
}
console.log(getQueryParams("/users?page=3&sort=name"));
// הפסקתי תרגילים כי מיכאל אמר לעבור לפרוייקט גיבורי על שאותו צריכים לעשות ולא את התרגילים

// 4
