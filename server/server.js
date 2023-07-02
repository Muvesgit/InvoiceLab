require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_REF, {useNewUrlParser: true} )
.then(() => {console.log("Database Connection successful!")})
.catch(e => {console.log("Database Connection failed: " + e)})

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
const Invoice = require("./Models/Invoice")

// routers
const usersRouter = require('./Routes/Users')
const invoicesRouter = require('./Routes/Invoices')
app.use('/Users', usersRouter)
app.use('/Invoices', invoicesRouter)

// launch
app.listen(8000, () => console.log('Express launched!'))
