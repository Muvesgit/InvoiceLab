require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_REF, {useNewUrlParser: true} )
.then(() => {console.log("Connection successful!")})
.catch(e => {console.log("Connection failed: " + e)})

const dbConnection = mongoose.connection
dbConnection.on('error', (error) => console.error(error))

// app definitions and components
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
  
// models
const User = require("./Models/User")


// routers
const usersRouter = require('./Routes/Users')
app.use('/Users', usersRouter)

// launch
app.listen(8000, () => console.log('Express launched!'))












// mongoose testing
run();

async function run(){
//   try{
//     const user = await User.create({
//       firstName: "David",
//       lastName: "Bateman",
//       email: "davidbateman@test.com",
//     });
//     await user.save().then(() => {console.log("User saved");})
//   }
//   catch(e){
//     console.log(e.message);
//   }
  // console.log(User.find()); // -all data  | .find({"name": /.*m.*/}) - regex
  
  // const user = await User.where("firstName").equals("Zsolt"); //array of all the results + .lt .gt .limit .equals .select | this selects the field to show
  // const user = await User.findOne({firstName: "Zsolt"}); //array of all the results + .lt .gt .limit .equals .select | this selects the field to show
  // console.log(user);
  // user.sayHi();

//   const user = await User.findByName("zsolt");
//   console.log(user);
//   console.log(user[0].namedEmail);

  // const user2 = await User.where().byName("bateman");
  // console.log(user2);
}


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