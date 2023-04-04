const mongoose = require("mongoose");


// model schema  used for the database
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true
  },
  password: String,
  confirmed: Boolean,
  createdAt: Date,
  updatedAt: Date,
  // company: companySchema, --to be defined
  company: {},
  products: [],

})

// makes mongodb recognize the model and exports it
module.exports = mongoose.model("User", userSchema)