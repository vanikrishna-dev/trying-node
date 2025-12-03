const http = require("http");
const fs = require("fs");
const { URLSearchParams } = require("url");

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
            <form action="/buy-products" method="POST">
                <input type="text" name="Product" placeholder="Name of the product">
                <br>
                <br>
                <input type="text" name="Budget" placeholder="Enter your budget">
                <br>
                <br>
                <input type="submit">
            </form>
        </body>
        </html>
      `);
  }
  else if (req.url === "/products"){
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
  else if ((req.url === "/buy-products" || req.url === "/buy-products?") && req.method === "POST") {
    console.log("Product info received");

    const productArr = [];
    req.on("data", (chunk) => {
        console.log(chunk);
        productArr.push(chunk);
    });

    req.on("end", () => {
      const productData = Buffer.concat(productArr).toString();
      const urlParams = new URLSearchParams(productData);
      const productsJson = {};
      for(const [key, value] of urlParams.entries()){
        productsJson[key] = value;
      }
      fs.writeFileSync('buy.txt', JSON.stringify(productsJson));
    });

    res.statusCode = 302;
    res.setHeader('Location', '/products');
  }
  else {
    res.statusCode = 404;
    res.write(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Error</title>
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
