const mongoose = require("mongoose");

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

const invoiceSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
	},
	type: {
    type: String,
    required: true
  },
	docNr: {
    type: String,
    required: true
  },
	docDate: {
    type: Date,
    required: true,
    immutable: true,
    default: () => Date.now(),
  },
	vat: {
		type: String,
    required: true
	},
	docCurrency: {
    type: String,
    required: true
  },
  docMessage: {
    type: String,
  },
	company: {
		type: companySchema,
    required: true
	},
	client: {
		type: companySchema,
    required: true
	},
	products: [productSchema],
})

module.exports = mongoose.model("Invoice", invoiceSchema)