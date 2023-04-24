const mongoose = require("mongoose");
const crypto = require("crypto");

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
  company: {},
  products: [],

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

// userSchema.query.byName = async function (name){
//   let lName = await this.where({lastName: new RegExp(name, 'i')});
//   let fName = await this.where({firstName: new RegExp(name, 'i')});

//   return (lName.length == 0) ? fName : lName;
// }

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