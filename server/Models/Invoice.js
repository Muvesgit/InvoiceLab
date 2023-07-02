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

const invProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Product Name"
  },
  uPrice: {
    type: String,
    required: true,
    default: "Product Unit Price"
  },
  quantity: {
    type: String,
    required: true,
    default: "Product Quantity"
  },
  qPrice: {
    type: String,
    required: true,
    default: "Product Quantity Price"
  }
});

const invoiceSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
	},
	docType: {
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
	products: [invProductSchema],
})

module.exports = mongoose.model("Invoice", invoiceSchema)