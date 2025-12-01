const http = require("http");

console.log("I have made a request");

const requestHandler = (req, res) => {
  console.log("I have made a request to the handler");
  console.log(req.method);
  res.setHeader('Content-type', 'text/html');
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Node</title>
    </head>
    <body>
    <center>
        <h1> This is Node trial page </h1>
    <center>
    <p> Trying node for the first time </p>
    </body>
    </html>
    `);
    res.end();
};

const server = http.createServer(requestHandler);
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
