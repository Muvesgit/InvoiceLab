const mongoose = require("mongoose");
const crypto = require("crypto");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Company Name"
  },
  orgReg: {
    type: String,
    required: true,
    default: "Company Registration Number"
  },
  cif: {
    type: String,
    required: true,
    default: "Customer Identification File"
  },
  address: {
    type: String,
    required: true,
    default: "Address"
  },
  bank: {
    type: String,
    required: true,
    default: "Bank"
  },
  account: {
    type: String,
    required: true,
    default: "Account - IBAN"
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Product Name"
  },
  price: {
    type: String,
    required: true,
    default: "Product Price"
  }
});

// model schema  used for the database
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 3,
    validate: {
      validator: v => ( v.includes("@") && v.includes(".")),
      message: props => `"${props.value}" is not a valid email.` 
    }
  },
  password: String,
  salt: String,
  confirmed: Boolean,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  company: {
    type: companySchema,
    default: {
      name: "Company Name",
      orgReg: "Company Registration Number",
      cif: "Customer Identification File",
      address: "Address",
      bank: "Bank",
      account: "Account - IBAN",
    }
  },
  products: [productSchema],
  clients: [companySchema],
})


userSchema.statics.findByName = async function (name){
  let lName = await this.find({lastName: new RegExp(name, 'i')});
  let fName = await this.find({firstName: new RegExp(name, 'i')});

  return (lName.length == 0) ? fName : lName;
}

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validatePassword = function(password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.password === hash;
}; 

userSchema.virtual('namedEmail').get(function() {
  return `${this.firstName} <${this.email}>`;
})

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
})

userSchema.post('save', function(doc, next) {
  next();
})

// makes mongodb recognize the model and exports it
module.exports = mongoose.model("User", userSchema)