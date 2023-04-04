const express = require('express');
const mongoose = require('mongoose');
const User = require("./Models/User")

mongoose.connect("mongodb://localhost/invoiceLab")
.then(() => {console.log("Connection successful!")})
.catch(e => {console.log("Connection failed: " + e)})


run();

async function run(){
  try{
    const user = await User.create({
      firstName: "David",
      lastName: "Bateman",
    });
    // await user.save().then(() => {console.log("User saved");})
    console.log(user);
  }
  catch(e){
    console.log(e.message);
  }
}

const app = express();

// const port = process.env.PORT;

// app.listen(port, (err) => {
//     if (err) return console.log(err);

//     console.log("Up and running on http://127.0.0.1:" + port);
// })


// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });