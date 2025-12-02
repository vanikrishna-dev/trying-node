const http = require("http");

console.log("I have made a request");

const requestHandler = (req, res) => {
  console.log("I have made a request to the handler");
  console.log(req.method);
  res.setHeader('Content-type', 'text/html');
  if(req.url==="/"){
    res.write(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Product Search</title>
        </head>
        <body>
            <center>
                <h1> Product Search </h1>
            <center>
            <p> Searching for the required products </p>
            <form action="/products">
                <input type="text" placeholder="Name of the product">
                <br>
                <br>
                <input type="text" placeholder="Enter your budget">
                <br>
                <br>
                <input type="submit">
            </form>
        </body>
        </html>
      `);
  }
  else if (req.url === "/products?"){
    res.write(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Product List</title>
        </head>
        <body>
            <center>
                <h1> Product List </h1>
            <center>
            <p> The required products will display here. </p>
        </body>
        </html>
      `);
  }
  else{
    res.write(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Product Search</title>
        </head>
        <body>
              <h1> 404 Page Not Found </h1>
        </body>
        </html>
      `);
  }

    res.end();
};

const server = http.createServer(requestHandler);
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running at port http://localhost:${PORT}`);
});
