const mongoose = require("mongoose");

// model schema  used for the database
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
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
  // company: companySchema, --to be defined
  company: {},
  products: [],

})


userSchema.methods.sayHi = function () {
  console.log(`Hi! My name is ${this.firstName}.`)
}

userSchema.statics.findByName = async function (name){
  let lName = await this.find({lastName: new RegExp(name, 'i')});
  let fName = await this.find({firstName: new RegExp(name, 'i')});

  return (lName.length == 0) ? fName : lName;
}

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
  doc.sayHi();
  next();
})

// makes mongodb recognize the model and exports it
module.exports = mongoose.model("User", userSchema)