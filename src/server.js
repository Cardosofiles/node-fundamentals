import http from "node:http";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  console.log(method, url);
  return res.end("hello Javascript and TypeScript");
});

server.listen(3333, () => {
  console.log("Server is running on port 3333");
});
